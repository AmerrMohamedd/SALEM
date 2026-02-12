from django.urls import path
from .views import (
    IncidentCreateAPIView,
    IncidentImageUploadAPIView,
    IncidentStatusListAPIView,
    IncidentListAPIView,
    IncidentDetailAPIView,
    MyIncidentsAPIView,
    DashboardStatsAPIView,
    WeeklyStatsAPIView,
    RecentIncidentsAPIView,
    IncidentsByDepartmentAPIView
)

urlpatterns = [
    path('statuses/', IncidentStatusListAPIView.as_view(), name='incident-statuses'),
    path('', IncidentListAPIView.as_view(), name='incident-list'),
    path('<int:pk>/', IncidentDetailAPIView.as_view(), name='incident-detail'),
    path('create/', IncidentCreateAPIView.as_view(), name='incident-create'),
    path('my/', MyIncidentsAPIView.as_view(), name='my-incidents'),
    path('<int:pk>/images/', IncidentImageUploadAPIView.as_view(), name='incident-image-upload'),
    path("dashboard/stats/", DashboardStatsAPIView.as_view()),
    path("dashboard/weekly/", WeeklyStatsAPIView.as_view()),
    path("dashboard/recent/", RecentIncidentsAPIView.as_view()),
    path("dashboard/by-department/", IncidentsByDepartmentAPIView.as_view()),



]