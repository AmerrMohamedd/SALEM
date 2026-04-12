from datetime import timedelta
from collections import defaultdict

from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from django.db.models.functions import TruncDate
from django.db.models import Count, Avg, F, ExpressionWrapper, DurationField

from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination

from django_filters.rest_framework import DjangoFilterBackend

from .models import Incident, IncidentStatus, Notification
from .serializers import (
    IncidentDetailSerializer,
    IncidentImageSerializer,
    IncidentListSerializer,
    IncidentSerializer,
    IncidentStatusSerializer,
    NotificationSerializer
)

# =========================================================
# 🧩 Core APIs
# =========================================================

class IncidentDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Incident.objects.select_related(
        "status",
        "assigned_to__employee_profile__department",
        "verification"
    ).prefetch_related("images")

    serializer_class = IncidentDetailSerializer


# =========================================================
# 👤 Citizen APIs
# =========================================================

class IncidentCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        serializer.save(citizen=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({
                "success": True,
                "data": serializer.data
            })

        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=400)


class MyIncidentsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return Incident.objects.filter(citizen=self.request.user)


class IncidentImageUploadAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        incident = get_object_or_404(
            Incident,
            pk=self.kwargs.get('pk'),
            citizen=self.request.user
        )
        serializer.save(incident=incident)


# =========================================================
# 📊 Dashboard APIs
# =========================================================

class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        today = timezone.now().date()

        return Response({
            "success": True,
            "data": {
                "total": Incident.objects.count(),
                "new": Incident.objects.filter(status__name="NEW").count(),
                "assigned": Incident.objects.filter(status__name="ASSIGNED").count(),
                "in_progress": Incident.objects.filter(status__name="IN_PROGRESS").count(),
                "completed": Incident.objects.filter(status__name="COMPLETED").count(),
                "resolved_today": Incident.objects.filter(
                    status__name="COMPLETED",
                    resolved_at__date=today
                ).count()
            }
        })


class WeeklyStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        week_ago = today - timedelta(days=6)

        data = (
            Incident.objects
            .filter(created_at__date__gte=week_ago)
            .annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

        return Response({
            "success": True,
            "data": list(data)
        })


class RecentIncidentsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        incidents = (
            Incident.objects
            .select_related("status", "assigned_to__employee_profile__department")
            .order_by("-created_at")[:3]
        )

        return Response({
            "success": True,
            "data": [
                {
                    "id": i.id,
                    "date": i.created_at,
                    "status": i.status.name,
                    "department": (
                        i.assigned_to.employee_profile.department.department_name
                        if i.assigned_to else None
                    )
                }
                for i in incidents
            ]
        })


class IncidentsByDepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = (
            Incident.objects
            .filter(assigned_to__isnull=False)
            .values("assigned_to__employee_profile__department__department_name")
            .annotate(count=Count("id"))
        )

        return Response({
            "success": True,
            "data": [
                {
                    "department": item["assigned_to__employee_profile__department__department_name"],
                    "count": item["count"]
                }
                for item in data
            ]
        })


# =========================================================
# 📋 Incident List
# =========================================================

class IncidentListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentListSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = {
        "status": ["exact"],
        "assigned_to__employee_profile__department": ["exact"],
        "created_at": ["date__gte", "date__lte"]
    }

    search_fields = ["description", "location"]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        return Incident.objects.select_related(
            "status",
            "assigned_to__employee_profile__department"
        )


class IncidentStatusListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = IncidentStatus.objects.all()
    serializer_class = IncidentStatusSerializer


# =========================================================
# 🔁 Workflow APIs
# =========================================================

class AcceptIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        if incident.citizen == request.user:
            raise PermissionDenied("Cannot accept your own incident.")

        if incident.assigned_to:
            return Response({"error": "Already assigned."}, status=400)

        if incident.status.name != "NEW":
            return Response({"error": "Only NEW incidents allowed."}, status=400)

        incident.assigned_to = request.user
        incident.status = IncidentStatus.objects.get(name="ASSIGNED")
        incident.save()

        # 🔔 Notifications
        Notification.objects.create(
            user=request.user,
            title="New Assignment",
            message=f"You have been assigned to incident #{incident.id}"
        )

        Notification.objects.create(
            user=incident.citizen,
            title="Incident Accepted",
            message=f"Your incident #{incident.id} has been accepted"
        )

        return Response({"success": True, "message": "Accepted"})


ALLOWED_TRANSITIONS = {
    "ASSIGNED": ["IN_PROGRESS"],
    "IN_PROGRESS": ["REVIEW"],
    "REVIEW": ["COMPLETED"],
}


class ChangeIncidentStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        if not incident.assigned_to:
            return Response({"error": "Accept first."}, status=400)

        if incident.assigned_to != request.user:
            raise PermissionDenied("Not your incident.")

        new_status_name = request.data.get("status")

        try:
            new_status = IncidentStatus.objects.get(name=new_status_name)
        except IncidentStatus.DoesNotExist:
            return Response({"error": "Invalid status."}, status=400)

        allowed = ALLOWED_TRANSITIONS.get(incident.status.name, [])

        if new_status.name not in allowed:
            return Response({"error": "Invalid transition."}, status=400)

        incident.status = new_status

        if new_status.name == "COMPLETED":
            incident.resolved_at = timezone.now()

        incident.save()

        # 🔔 Notification
        Notification.objects.create(
            user=incident.citizen,
            title="Status Updated",
            message=f"Your incident #{incident.id} is now {new_status.name}"
        )

        return Response({"success": True, "message": "Updated"})


# =========================================================
# 📜 History API
# =========================================================

class IncidentHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        queryset = Incident.objects.select_related("incident_type", "status").filter(
            status__name="COMPLETED",
            resolved_at__isnull=False
        ).order_by("-created_at")

        if request.GET.get("search"):
            queryset = queryset.filter(location__icontains=request.GET["search"])

        if request.GET.get("date"):
            parsed = parse_date(request.GET["date"])
            if parsed:
                queryset = queryset.filter(created_at__date=parsed)

        if request.GET.get("type"):
            queryset = queryset.filter(incident_type__id=request.GET["type"])

        if request.GET.get("priority"):
            queryset = queryset.filter(priority=request.GET["priority"])

        total = queryset.count()

        most_common = (
            queryset.values("incident_type__name")
            .annotate(count=Count("id"))
            .order_by("-count")
            .first()
        )

        avg = queryset.annotate(
            duration=ExpressionWrapper(
                F("resolved_at") - F("created_at"),
                output_field=DurationField()
            )
        ).aggregate(avg_duration=Avg("duration"))

        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request)

        data = [
            {
                "id": i.id,
                "date": i.created_at,
                "type": i.incident_type.name if i.incident_type else None,
                "status": i.status.name,
                "priority": i.priority,
                "location": i.location,
                "resolution_time": str(i.resolved_at - i.created_at)
            }
            for i in page
        ]

        return paginator.get_paginated_response({
            "success": True,
            "stats": {
                "total": total,
                "most_common_type": most_common["incident_type__name"] if most_common else None,
                "avg_resolution_time": str(avg["avg_duration"]) if avg["avg_duration"] else None
            },
            "data": data
        })


# =========================================================
# 📌 Workflow Board
# =========================================================

class WorkflowAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        incidents = Incident.objects.select_related(
            "status",
            "assigned_to__employee_profile__department"
        )

        grouped = defaultdict(list)

        for i in incidents:
            grouped[i.status.name].append(i)

        statuses = IncidentStatus.objects.all()

        return Response({
            "success": True,
            "data": {
                s.name: {
                    "count": len(grouped[s.name]),
                    "incidents": IncidentListSerializer(grouped[s.name], many=True).data
                }
                for s in statuses
            }
        })


# =========================================================
# 🔔 Notifications APIs
# =========================================================

class NotificationListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user).order_by("-created_at")

        return Response({
            "success": True,
            "data": NotificationSerializer(notifications, many=True).data
        })


class MarkNotificationReadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk, user=request.user)

        notification.is_read = True
        notification.save()

        return Response({
            "success": True,
            "data": "Marked as read"
        })