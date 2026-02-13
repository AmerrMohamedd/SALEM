from datetime import timedelta
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db.models.functions import TruncDate
from django.db.models import Count

from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from django_filters.rest_framework import DjangoFilterBackend

from .models import Incident, IncidentStatus
from .serializers import (
    IncidentDetailSerializer,
    IncidentImageSerializer,
    IncidentListSerializer,
    IncidentSerializer,
    IncidentStatusSerializer,
)


# =========================
# Core APIs
# =========================

# Api #1 - Incident Detail

class IncidentDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Incident.objects.select_related(
        "status",
        "assigned_to__employee_profile__department",
        "verification"
    ).prefetch_related("images")

    serializer_class = IncidentDetailSerializer

# =========================
# Citizen APIs
# =========================

# API #1 - Create Incident

class IncidentCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def perform_create(self, serializer):
        serializer.save(citizen=self.request.user)


# API #2 - Get My Incidents for citizen

class MyIncidentsAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return Incident.objects.filter(citizen=self.request.user)


# API #3 - Upload Image

class IncidentImageUploadAPIView(generics.CreateAPIView):
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

# =========================
# Dashboard APIs (Employees Only)
# =========================        

# Dashboard Api #1 - (Total,Pending,In Progress,Rejected,Resolved Today)
class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        today = timezone.now().date()

        total = Incident.objects.count()

        pending = Incident.objects.filter(
            status__name__iexact="Pending"
        ).count()

        in_progress = Incident.objects.filter(
            status__name__iexact="In Progress"
        ).count()

        rejected = Incident.objects.filter(
            status__name__iexact="Rejected"
        ).count()

        resolved_today = Incident.objects.filter(
            status__name__iexact="Resolved",
            created_at__date=today
        ).count()

        return Response({
            "total": total,
            "pending": pending,
            "in_progress": in_progress,
            "rejected": rejected,
            "resolved_today": resolved_today
        })
    
# Dashboard Api #2 -Line Chart
class WeeklyStatsAPIView(APIView):
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
    

# Dashboard Api #3 - latest 4 Recent Incidents
class RecentIncidentsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Employees only.")

        incidents = (
            Incident.objects
            .select_related(
                "status",
                "assigned_to__employee_profile__department"
            )
            .order_by("-created_at")[:3]
        )

        data = [
            {
                "id": incident.id,
                "date": incident.created_at,
                "status": incident.status.name,
                "department": (
                    incident.assigned_to.employee_profile.department.department_name
                    if incident.assigned_to else None
                )
            }
            for incident in incidents
        ]

        return Response(data)    
    

# Dashboard Api #4 -Pie Chart
class IncidentsByDepartmentAPIView(APIView):
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

        formatted_data = [
            {
                "department": item["assigned_to__employee_profile__department__department_name"],
                "count": item["count"]
            }
            for item in data
        ]

        return Response(formatted_data)
    
# =========================
# Incident List + Filtering
# =========================

# Dashboard Api #5 - List Incidents and filtering
class IncidentListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = IncidentListSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

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


# Dashboard Api #7 -Get Incident Statuses
class IncidentStatusListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = IncidentStatus.objects.all()
    serializer_class = IncidentStatusSerializer


# =========================
# Employee Workflow APIs
# =========================


class AcceptIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        if not hasattr(request.user, "employee_profile"):
            raise PermissionDenied("Only employees can accept incidents.")

        if incident.citizen == request.user:
            raise PermissionDenied("You cannot accept your own incident.")

        if incident.assigned_to:
            return Response(
                {"error": "Incident already assigned."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if incident.status.name.lower() != "pending":
            return Response(
                {"error": "Only pending incidents can be accepted."},
                status=status.HTTP_400_BAD_REQUEST
            )

        incident.assigned_to = request.user

        assigned_status = IncidentStatus.objects.get(name__iexact="Assigned")
        incident.status = assigned_status

        incident.save()

        return Response({"message": "Incident accepted successfully."})


ALLOWED_TRANSITIONS = {
    "Assigned": ["In Progress"],
    "In Progress": ["Review"],
    "Review": ["Completed"],
}

# Dashboard Api #8 -Get Incident Statuses
class ChangeIncidentStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        if not incident.assigned_to:
            return Response(
                {"error": "Incident must be accepted first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if incident.assigned_to != request.user:
            raise PermissionDenied("You are not assigned to this incident.")

        new_status_name = request.data.get("status")

        if not new_status_name:
            return Response(
                {"error": "Status is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            new_status = IncidentStatus.objects.get(name__iexact=new_status_name)
        except IncidentStatus.DoesNotExist:
            return Response(
                {"error": "Invalid status."},
                status=status.HTTP_400_BAD_REQUEST
            )

        current_status = incident.status.name
        allowed = ALLOWED_TRANSITIONS.get(current_status, [])

        if new_status.name not in allowed:
            return Response(
                {"error": "Invalid status transition."},
                status=status.HTTP_400_BAD_REQUEST
            )

        incident.status = new_status
        incident.save()

        return Response({"message": "Status updated successfully."})
    