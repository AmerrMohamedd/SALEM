from django.urls import path
from .views import (
    IncidentCreateAPIView,
    IncidentImageUploadAPIView,
    IncidentStatusListAPIView,
    IncidentListAPIView,
    IncidentDetailAPIView,
    MyIncidentsAPIView
)

urlpatterns = [
    path('statuses/', IncidentStatusListAPIView.as_view(), name='incident-statuses'),
    path('', IncidentListAPIView.as_view(), name='incident-list'),
    path('<int:pk>/', IncidentDetailAPIView.as_view(), name='incident-detail'),
    path('create/', IncidentCreateAPIView.as_view(), name='incident-create'),
    path('my/', MyIncidentsAPIView.as_view(), name='my-incidents'),
    path('<int:pk>/images/', IncidentImageUploadAPIView.as_view(), name='incident-image-upload'),


]