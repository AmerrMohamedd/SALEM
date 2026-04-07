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

from .models import Incident, IncidentStatus
from .serializers import (
    IncidentDetailSerializer,
    IncidentImageSerializer,
    IncidentListSerializer,
    IncidentSerializer,
    IncidentStatusSerializer,
)

# =========================================================
# 🧩 Core APIs
# =========================================================

class IncidentDetailAPIView(generics.RetrieveAPIView):
    """
    Retrieve full details of a single incident.
    Optimized with select_related + prefetch_related.
    """
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
    """
    Create a new incident.
    The citizen is automatically assigned from the authenticated user.
    """
    permission_classes = [IsAuthenticated]
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        serializer.save(citizen=self.request.user)


class MyIncidentsAPIView(generics.ListAPIView):
    """
    Retrieve all incidents created by the logged-in citizen.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return Incident.objects.filter(citizen=self.request.user)


class IncidentImageUploadAPIView(generics.CreateAPIView):
    """
    Upload images related to a specific incident.
    Only the owner of the incident can upload images.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        incident_id = self.kwargs.get('pk')

        incident = get_object_or_404(
            Incident,
            pk=incident_id,
            citizen=self.request.user
        )

        serializer.save(incident=incident)


# =========================================================
# 📊 Dashboard APIs (Employees Only)
# =========================================================

class DashboardStatsAPIView(APIView):
    """
    Provides dashboard summary statistics:
    - Total incidents
    - Pending
    - In Progress
    - Rejected
    - Resolved today (based on resolved_at)
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        today = timezone.now().date()

        return Response({
            "total": Incident.objects.count(),
            "pending": Incident.objects.filter(status__name__iexact="Pending").count(),
            "in_progress": Incident.objects.filter(status__name__iexact="In Progress").count(),
            "rejected": Incident.objects.filter(status__name__iexact="Rejected").count(),
            "resolved_today": Incident.objects.filter(
                status__name__iexact="Resolved",
                resolved_at__date=today
            ).count()
        })


class WeeklyStatsAPIView(APIView):
    """
    Returns number of incidents created per day (last 7 days).
    Used for line chart visualization.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

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

        return Response(list(data))


class RecentIncidentsAPIView(APIView):
    """
    Returns the latest 3 incidents for quick dashboard preview.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        incidents = (
            Incident.objects
            .select_related("status", "assigned_to__employee_profile__department")
            .order_by("-created_at")[:3]
        )

        return Response([
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
        ])


class IncidentsByDepartmentAPIView(APIView):
    """
    Returns number of incidents grouped by department.
    Used for pie chart.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        data = (
            Incident.objects
            .filter(assigned_to__isnull=False)
            .values("assigned_to__employee_profile__department__department_name")
            .annotate(count=Count("id"))
        )

        return Response([
            {
                "department": item["assigned_to__employee_profile__department__department_name"],
                "count": item["count"]
            }
            for item in data
        ])


# =========================================================
# 📋 Incident List + Filtering
# =========================================================

class IncidentListAPIView(generics.ListAPIView):
    """
    List incidents with filtering, search, and ordering support.
    """
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
    """
    Returns all available incident statuses.
    """
    permission_classes = [IsAuthenticated]
    queryset = IncidentStatus.objects.all()
    serializer_class = IncidentStatusSerializer


# =========================================================
# 🔁 Workflow APIs
# =========================================================

class AcceptIncidentAPIView(APIView):
    """
    Assign an incident to the current employee.
    Only Pending incidents can be accepted.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        if incident.citizen == request.user:
            raise PermissionDenied("Cannot accept your own incident.")

        if incident.assigned_to:
            return Response({"error": "Already assigned."}, status=400)

        if incident.status.name.lower() != "pending":
            return Response({"error": "Only pending allowed."}, status=400)

        incident.assigned_to = request.user
        incident.status = IncidentStatus.objects.get(name__iexact="Assigned")
        incident.save()

        return Response({"message": "Accepted successfully."})


ALLOWED_TRANSITIONS = {
    "Assigned": ["In Progress"],
    "In Progress": ["Review"],
    "Review": ["Completed"],
}


class ChangeIncidentStatusAPIView(APIView):
    """
    Change incident status with strict transition rules.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        if not incident.assigned_to:
            return Response({"error": "Accept first."}, status=400)

        if incident.assigned_to != request.user:
            raise PermissionDenied("Not your incident.")

        new_status_name = request.data.get("status")

        try:
            new_status = IncidentStatus.objects.get(name__iexact=new_status_name)
        except IncidentStatus.DoesNotExist:
            return Response({"error": "Invalid status."}, status=400)

        allowed = ALLOWED_TRANSITIONS.get(incident.status.name, [])

        if new_status.name not in allowed:
            return Response({"error": "Invalid transition."}, status=400)

        incident.status = new_status
        incident.resolved_at = timezone.now() if new_status.name == "Completed" else None
        incident.save()

        return Response({"message": "Updated successfully."})


# =========================================================
# 📜 History API
# =========================================================

class IncidentHistoryAPIView(APIView):
    """
    Returns resolved incidents with:
    - Filters
    - Statistics
    - Pagination
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):

        queryset = Incident.objects.filter(
            resolved_at__isnull=False
        ).select_related("incident_type").order_by("-created_at")

        # Filters
        if request.GET.get("street"):
            queryset = queryset.filter(location__icontains=request.GET["street"])

        if request.GET.get("date"):
            parsed = parse_date(request.GET["date"])
            if parsed:
                queryset = queryset.filter(created_at__date=parsed)

        if request.GET.get("priority"):
            queryset = queryset.filter(priority=request.GET["priority"])

        # Stats
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

        # Pagination
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request)

        data = [
            {
                "id": i.id,
                "title": i.title,
                "location": i.location,
                "priority": i.priority,
                "incident_type": i.incident_type.name if i.incident_type else None,
                "resolution_time": str(i.resolved_at - i.created_at)
            }
            for i in page
        ]

        return paginator.get_paginated_response({
            "stats": {
                "total_incidents": total,
                "most_common_incident_type": most_common["incident_type__name"] if most_common else None,
                "average_resolution_time": str(avg["avg_duration"]) if avg["avg_duration"] else None
            },
            "results": data
        })


# =========================================================
# 📌 Workflow Board API
# =========================================================

class WorkflowAPIView(APIView):
    """
    Returns incidents grouped by status for Kanban board.
    Optimized using dictionary grouping (O(n)).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        incidents = Incident.objects.select_related("status")

        grouped = defaultdict(list)

        for i in incidents:
            grouped[i.status_id].append(i)

        statuses = IncidentStatus.objects.all()

        return Response({
            s.name: {
                "count": len(grouped[s.id]),
                "incidents": IncidentListSerializer(grouped[s.id], many=True).data
            }
            for s in statuses
        })