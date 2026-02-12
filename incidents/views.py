from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Incident, IncidentStatus
from .serializers import IncidentImageSerializer, IncidentSerializer, IncidentStatusSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


#Core Api #1 -Get Incident Statuses
class IncidentStatusListAPIView(generics.ListAPIView):
    queryset = IncidentStatus.objects.all()
    serializer_class = IncidentStatusSerializer


#Core Api #2 - List Incidents
class IncidentListAPIView(generics.ListAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer


#Core Api #3 - Incident Detail
class IncidentDetailAPIView(generics.RetrieveAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer


# Citizen API #1 - Create Incident
class IncidentCreateAPIView(generics.CreateAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise PermissionError("You must be logged in to create an incident.")
        
        serializer.save(citizen=self.request.user)


# Citizen API #2 - Get My Incidents for citizen
class MyIncidentsAPIView(generics.ListAPIView):
    serializer_class = IncidentSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Incident.objects.none()  
        return Incident.objects.filter(citizen=self.request.user)


# Citizen API #3 - Upload Image
class IncidentImageUploadAPIView(generics.CreateAPIView):
    serializer_class = IncidentImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise PermissionError("User must be logged in to upload images.")

        incident_id = self.kwargs.get('pk')
        incident = get_object_or_404(
            Incident,
            pk=incident_id,
            citizen=self.request.user
        )
        serializer.save(incident=incident)