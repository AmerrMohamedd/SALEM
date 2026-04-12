from django.urls import path
from .views import *

urlpatterns = [

    # =========================================================
    # 📊 Dashboard
    # =========================================================
    path("stats/", DashboardStatsAPIView.as_view()),
    path("weekly/", WeeklyStatsAPIView.as_view()),
    path("recent/", RecentIncidentsAPIView.as_view()),
    path("by-department/", IncidentsByDepartmentAPIView.as_view()),

    # =========================================================
    # 📋 Incidents
    # =========================================================
    path("", IncidentListAPIView.as_view()),
    path("<int:pk>/", IncidentDetailAPIView.as_view()),
    path("create/", IncidentCreateAPIView.as_view()),
    path("my/", MyIncidentsAPIView.as_view()),
    path("<int:pk>/images/", IncidentImageUploadAPIView.as_view()),

    # =========================================================
    # 🔁 Workflow
    # =========================================================
    path("workflow/", WorkflowAPIView.as_view()),
    path("<int:pk>/accept/", AcceptIncidentAPIView.as_view()),
    path("<int:pk>/change-status/", ChangeIncidentStatusAPIView.as_view()),

    # =========================================================
    # 📜 History
    # =========================================================
    path("history/", IncidentHistoryAPIView.as_view()),

    # =========================================================
    # ⚙️ Metadata
    # =========================================================
    path("statuses/", IncidentStatusListAPIView.as_view()),

    # =========================================================
    # 🔔 Notifications
    # =========================================================
    path("notifications/", NotificationListAPIView.as_view()),
    path("notifications/<int:pk>/read/", MarkNotificationReadAPIView.as_view()),
]