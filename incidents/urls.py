from django.urls import path

from .views import (
    AcceptIncidentAPIView,
    ChangeIncidentStatusAPIView,
    DashboardStatsAPIView,
    IncidentCreateAPIView,
    IncidentDetailAPIView,
    IncidentHistoryAPIView,
    IncidentImageUploadAPIView,
    IncidentListAPIView,
    IncidentStatusListAPIView,
    IncidentsByDepartmentAPIView,
    MarkNotificationReadAPIView,
    MyIncidentsAPIView,
    NotificationListAPIView,
    RecentIncidentsAPIView,
    WeeklyStatsAPIView,
    WorkflowAPIView,
)

urlpatterns = [
    # Dashboard
    path("stats/", DashboardStatsAPIView.as_view(), name="incidents-stats"),
    path("weekly/", WeeklyStatsAPIView.as_view(), name="incidents-weekly"),
    path("recent/", RecentIncidentsAPIView.as_view(), name="incidents-recent"),
    path(
        "by-department/",
        IncidentsByDepartmentAPIView.as_view(),
        name="incidents-by-department",
    ),
    # Incidents
    path("", IncidentListAPIView.as_view(), name="incidents-list"),
    path("<int:pk>/", IncidentDetailAPIView.as_view(), name="incidents-detail"),
    path("create/", IncidentCreateAPIView.as_view(), name="incidents-create"),
    path("my/", MyIncidentsAPIView.as_view(), name="incidents-my"),
    path(
        "<int:pk>/images/",
        IncidentImageUploadAPIView.as_view(),
        name="incidents-images",
    ),
    # Workflow
    path("workflow/", WorkflowAPIView.as_view(), name="incidents-workflow"),
    path("<int:pk>/accept/", AcceptIncidentAPIView.as_view(), name="incidents-accept"),
    path(
        "<int:pk>/change-status/",
        ChangeIncidentStatusAPIView.as_view(),
        name="incidents-change-status",
    ),
    # History
    path("history/", IncidentHistoryAPIView.as_view(), name="incidents-history"),
    # Metadata
    path("statuses/", IncidentStatusListAPIView.as_view(), name="incidents-statuses"),
    # Notifications
    path(
        "notifications/",
        NotificationListAPIView.as_view(),
        name="incidents-notifications",
    ),
    path(
        "notifications/<int:pk>/read/",
        MarkNotificationReadAPIView.as_view(),
        name="incidents-notification-read",
    ),
]
