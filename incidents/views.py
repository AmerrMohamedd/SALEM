from datetime import timedelta
from collections import defaultdict

from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from django.db.models.functions import TruncDate
from django.db.models import Count, Avg, F, ExpressionWrapper, DurationField

from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination

from django_filters.rest_framework import DjangoFilterBackend

from .models import Incident, IncidentStatus, Notification
from .permissions import (
    IsEmployee,
    IsCitizen,
    CanViewIncident,
    IsAssignedEmployee,
)
from .services import log_incident_history, normalize_incident_status_name
from .serializers import (
    IncidentDetailSerializer,
    IncidentImageSerializer,
    IncidentListSerializer,
    IncidentSerializer,
    IncidentStatusSerializer,
    NotificationSerializer,
)

# ---------------------------------------------------------------------------
# Status workflow (machine)
# ---------------------------------------------------------------------------
ALLOWED_TRANSITIONS = {
    "ASSIGNED": ["IN_PROGRESS"],
    "IN_PROGRESS": ["REVIEW"],
    "REVIEW": ["COMPLETED"],
}


# ---------------------------------------------------------------------------
# Core
# ---------------------------------------------------------------------------
class IncidentDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, CanViewIncident]
    serializer_class = IncidentDetailSerializer
    queryset = Incident.objects.select_related(
        "status",
        "incident_type",
        "assigned_to__employee_profile__department",
        "verification",
    ).prefetch_related("images")


# ---------------------------------------------------------------------------
# Citizen
# ---------------------------------------------------------------------------
class IncidentCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, IsCitizen]
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        serializer.save(citizen=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )


class MyIncidentsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return Incident.objects.filter(citizen=self.request.user).select_related(
            "status", "incident_type"
        )


class IncidentImageUploadAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        incident = get_object_or_404(
            Incident,
            pk=self.kwargs.get("pk"),
            citizen=self.request.user,
        )
        serializer.save(incident=incident)


# ---------------------------------------------------------------------------
# Dashboard (employees)
# ---------------------------------------------------------------------------
class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def get(self, request):
        today = timezone.now().date()

        return Response(
            {
                "success": True,
                "data": {
                    "total": Incident.objects.count(),
                    "new": Incident.objects.filter(
                        status__name=IncidentStatus.StatusChoices.NEW
                    ).count(),
                    "assigned": Incident.objects.filter(
                        status__name=IncidentStatus.StatusChoices.ASSIGNED
                    ).count(),
                    "in_progress": Incident.objects.filter(
                        status__name=IncidentStatus.StatusChoices.IN_PROGRESS
                    ).count(),
                    "completed": Incident.objects.filter(
                        status__name=IncidentStatus.StatusChoices.COMPLETED
                    ).count(),
                    "resolved_today": Incident.objects.filter(
                        status__name=IncidentStatus.StatusChoices.COMPLETED,
                        resolved_at__date=today,
                    ).count(),
                },
            }
        )


class WeeklyStatsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def get(self, request):
        today = timezone.now().date()
        week_ago = today - timedelta(days=6)

        data = (
            Incident.objects.filter(created_at__date__gte=week_ago)
            .annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

        return Response({"success": True, "data": list(data)})


class RecentIncidentsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def get(self, request):
        incidents = (
            Incident.objects.select_related(
                "status", "assigned_to__employee_profile__department"
            )
            .order_by("-created_at")[:10]
        )

        return Response(
            {
                "success": True,
                "data": [
                    {
                        "id": i.id,
                        "date": i.created_at,
                        "status": i.status.name,
                        "department": (
                            i.assigned_to.employee_profile.department.department_name
                            if i.assigned_to
                            and hasattr(i.assigned_to, "employee_profile")
                            else None
                        ),
                    }
                    for i in incidents
                ],
            }
        )


class IncidentsByDepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def get(self, request):
        data = (
            Incident.objects.filter(assigned_to__isnull=False)
            .values("assigned_to__employee_profile__department__department_name")
            .annotate(count=Count("id"))
        )

        return Response(
            {
                "success": True,
                "data": [
                    {
                        "department": item[
                            "assigned_to__employee_profile__department__department_name"
                        ],
                        "count": item["count"],
                    }
                    for item in data
                ],
            }
        )


# ---------------------------------------------------------------------------
# Incident list (employees)
# ---------------------------------------------------------------------------
class IncidentListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsEmployee]
    serializer_class = IncidentListSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = {
        "status": ["exact"],
        "assigned_to__employee_profile__department": ["exact"],
        "created_at": ["date__gte", "date__lte"],
        "priority": ["exact"],
        "incident_type": ["exact"],
    }
    search_fields = ["title", "description", "location"]
    ordering_fields = ["created_at", "priority"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Incident.objects.select_related(
            "status",
            "incident_type",
            "assigned_to__employee_profile__department",
        )


class IncidentStatusListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = IncidentStatus.objects.all()
    serializer_class = IncidentStatusSerializer


# ---------------------------------------------------------------------------
# Workflow
# ---------------------------------------------------------------------------
class AcceptIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def patch(self, request, pk):
        incident = get_object_or_404(
            Incident.objects.select_related("status"), pk=pk
        )

        if incident.citizen_id == request.user.id:
            raise PermissionDenied("You cannot accept your own incident.")

        if incident.assigned_to_id:
            return Response(
                {"success": False, "errors": {"detail": "Already assigned."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if incident.status.name != IncidentStatus.StatusChoices.NEW:
            return Response(
                {
                    "success": False,
                    "errors": {"detail": "Only NEW incidents can be accepted."},
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        old_status = incident.status
        assigned_status = get_object_or_404(
            IncidentStatus, name=IncidentStatus.StatusChoices.ASSIGNED
        )

        incident.assigned_to = request.user
        incident.status = assigned_status
        incident.save(
            update_fields=["assigned_to", "status"]
        )

        log_incident_history(
            incident=incident,
            actor=request.user,
            old_status=old_status,
            new_status=assigned_status,
            note="accepted",
        )

        Notification.objects.create(
            user=request.user,
            title="New assignment",
            message=f"You have been assigned to incident #{incident.id}.",
        )
        Notification.objects.create(
            user=incident.citizen,
            title="Incident accepted",
            message=f"Your incident #{incident.id} has been accepted.",
        )

        return Response({"success": True, "message": "Accepted"})


class ChangeIncidentStatusAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAssignedEmployee]

    def patch(self, request, pk):
        incident = get_object_or_404(
            Incident.objects.select_related("status"), pk=pk
        )
        self.check_object_permissions(request, incident)

        if not incident.assigned_to_id:
            return Response(
                {"success": False, "errors": {"detail": "Incident must be accepted first."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        raw_status = request.data.get("status")
        normalized = normalize_incident_status_name(raw_status)
        if not normalized:
            return Response(
                {"success": False, "errors": {"status": ["This field is required."]}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            new_status = IncidentStatus.objects.get(name=normalized)
        except IncidentStatus.DoesNotExist:
            return Response(
                {"success": False, "errors": {"status": ["Invalid status."]}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        current = incident.status.name
        allowed = ALLOWED_TRANSITIONS.get(current, [])
        if new_status.name not in allowed:
            return Response(
                {
                    "success": False,
                    "errors": {
                        "detail": f"Cannot transition from {current} to {new_status.name}."
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        old_status = incident.status
        incident.status = new_status
        if new_status.name == IncidentStatus.StatusChoices.COMPLETED:
            incident.resolved_at = timezone.now()
        else:
            incident.resolved_at = None

        incident.save(update_fields=["status", "resolved_at"])

        log_incident_history(
            incident=incident,
            actor=request.user,
            old_status=old_status,
            new_status=new_status,
            note="status_change",
        )

        Notification.objects.create(
            user=incident.citizen,
            title="Status updated",
            message=f"Incident #{incident.id} is now {new_status.name}.",
        )

        return Response(
            {
                "success": True,
                "message": "Updated",
                "incident_id": incident.id,
                "new_status": new_status.name,
                "resolved_at": incident.resolved_at,
            }
        )


# ---------------------------------------------------------------------------
# History (completed incidents — employees)
# ---------------------------------------------------------------------------
class IncidentHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def get(self, request):
        queryset = (
            Incident.objects.select_related("incident_type", "status")
            .filter(
                status__name=IncidentStatus.StatusChoices.COMPLETED,
                resolved_at__isnull=False,
            )
            .order_by("-created_at")
        )

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
                output_field=DurationField(),
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
                "resolution_time": str(i.resolved_at - i.created_at),
            }
            for i in page
        ]

        return paginator.get_paginated_response(
            {
                "success": True,
                "stats": {
                    "total": total,
                    "most_common_type": (
                        most_common["incident_type__name"] if most_common else None
                    ),
                    "avg_resolution_time": (
                        str(avg["avg_duration"]) if avg["avg_duration"] else None
                    ),
                },
                "data": data,
            }
        )


# ---------------------------------------------------------------------------
# Workflow board
# ---------------------------------------------------------------------------
class WorkflowAPIView(APIView):
    permission_classes = [IsAuthenticated, IsEmployee]

    def get(self, request):
        incidents = Incident.objects.select_related(
            "status",
            "incident_type",
            "assigned_to__employee_profile__department",
        )

        grouped = defaultdict(list)
        for i in incidents:
            grouped[i.status.name].append(i)

        statuses = IncidentStatus.objects.all()

        return Response(
            {
                "success": True,
                "data": {
                    s.name: {
                        "count": len(grouped[s.name]),
                        "incidents": IncidentListSerializer(
                            grouped[s.name], many=True
                        ).data,
                    }
                    for s in statuses
                },
            }
        )


# ---------------------------------------------------------------------------
# Notifications
# ---------------------------------------------------------------------------
class NotificationListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by(
            "-created_at"
        )

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({"success": True, "data": response.data})


class MarkNotificationReadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        notification = get_object_or_404(
            Notification, pk=pk, user=request.user
        )
        notification.is_read = True
        notification.save(update_fields=["is_read"])

        return Response(
            {
                "success": True,
                "data": NotificationSerializer(notification).data,
            }
        )
