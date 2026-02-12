from rest_framework import serializers
from .models import IncidentImage, IncidentStatus, Incident



# show all status of report
class IncidentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentStatus
        fields = ["id", "name"]


class IncidentSerializer(serializers.ModelSerializer):
    status = serializers.PrimaryKeyRelatedField(
        queryset=IncidentStatus.objects.all()
    )

    class Meta:
        model = Incident
        fields = '__all__'
        # Citizen will always be taken from the authenticated user,
        # so it should not be supplied from the client.
        read_only_fields = ['citizen']

class IncidentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentImage
        fields = ['id', 'incident', 'image', 'uploaded_at']
        # The view determines which incident an image belongs to.
        read_only_fields = ['incident', 'uploaded_at']


class IncidentListSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="status.name", read_only=True)
    department = serializers.CharField(
        source="assigned_to.employee_profile.department.department_name",
        read_only=True
    )

    class Meta:
        model = Incident
        fields = [
            "id",
            "description",
            "location",
            "created_at",
            "status",
            "department",
            "priority",
        ]        