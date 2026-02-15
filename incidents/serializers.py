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
    department = serializers.SerializerMethodField()

    class Meta:
        model = Incident
        fields = [
            "id",
            "title",
            "description",
            "location",
            "created_at",
            "status",
            "department",
            "priority",
        ]

    def get_department(self, obj):
        if not obj.assigned_to or not hasattr(obj.assigned_to, "employee_profile"):
            return None
        try:
            return obj.assigned_to.employee_profile.department.department_name
        except Exception:
            return None        


# Details (safe for React: handles missing assigned_to and verification)
class IncidentDetailSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="status.name", read_only=True)
    department = serializers.SerializerMethodField()
    priority = serializers.CharField(source="get_priority_display", read_only=True)
    images = IncidentImageSerializer(many=True, read_only=True)
    verification_image = serializers.SerializerMethodField()
    verification_comment = serializers.SerializerMethodField()

    class Meta:
        model = Incident
        fields = [
            "id",
            "title",
            "description",
            "location",
            "created_at",
            "status",
            "priority",
            "department",
            "latitude",
            "longitude",
            "images",
            "verification_image",
            "verification_comment",
        ]

    def get_department(self, obj):
        if not obj.assigned_to or not hasattr(obj.assigned_to, "employee_profile"):
            return None
        try:
            return obj.assigned_to.employee_profile.department.department_name
        except Exception:
            return None

    def get_verification_image(self, obj):
        try:
            return obj.verification.image if obj.verification else None
        except Exception:
            return None

    def get_verification_comment(self, obj):
        try:
            return obj.verification.comment if obj.verification else None
        except Exception:
            return None
