from django.urls import path
from .views import (
    AcceptIncidentAPIView,
    ChangeIncidentStatusAPIView,
    IncidentCreateAPIView,
    IncidentImageUploadAPIView,
    IncidentStatusListAPIView,
    IncidentListAPIView,
    IncidentDetailAPIView,
    MyIncidentsAPIView,
    DashboardStatsAPIView,
    WeeklyStatsAPIView,
    RecentIncidentsAPIView,
    IncidentsByDepartmentAPIView,
    IncidentHistoryAPIView,
    WorkflowAPIView,
)

urlpatterns = [
    path('statuses/', IncidentStatusListAPIView.as_view(), name='dashboard-incident-statuses'),
    path('', IncidentListAPIView.as_view(), name='dashboard-incident-list'),
    path('<int:pk>/', IncidentDetailAPIView.as_view(), name='dashboard-incident-detail'),
    path('create/', IncidentCreateAPIView.as_view(), name='dashboard-incident-create'),
    path('my/', MyIncidentsAPIView.as_view(), name='dashboard-my-incidents'),
    path('<int:pk>/images/', IncidentImageUploadAPIView.as_view(), name='dashboard-incident-image-upload'),

    path("stats/", DashboardStatsAPIView.as_view(), name="dashboard-stats"),
    path("weekly/", WeeklyStatsAPIView.as_view(), name="dashboard-weekly"),
    path("recent/", RecentIncidentsAPIView.as_view(), name="dashboard-recent"),
    path("by-department/", IncidentsByDepartmentAPIView.as_view(), name="dashboard-by-department"),

    path("<int:pk>/accept/", AcceptIncidentAPIView.as_view(), name="dashboard-accept-incident"),
    path("<int:pk>/change-status/", ChangeIncidentStatusAPIView.as_view(), name="dashboard-change-status"),

    path("history/", IncidentHistoryAPIView.as_view(), name="dashboard-incident-history"),
    path("workflow/", WorkflowAPIView.as_view(), name="dashboard-workflow"),
]