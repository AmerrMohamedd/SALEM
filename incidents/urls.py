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
    path('incident-statuses/', IncidentStatusListAPIView.as_view(), name='incident-statuses'),
    path('incidents/', IncidentListAPIView.as_view(), name='incident-list'),
    path('incidents/<int:pk>/', IncidentDetailAPIView.as_view(), name='incident-detail'),
    path('incidents/create/', IncidentCreateAPIView.as_view(), name='incident-create'),
    path('incidents/my/', MyIncidentsAPIView.as_view(), name='my-incidents'),
    path('incidents/<int:pk>/images/', IncidentImageUploadAPIView.as_view(), name='incident-image-upload'),



]