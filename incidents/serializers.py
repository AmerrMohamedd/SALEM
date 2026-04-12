from rest_framework import serializers
from .models import IncidentImage, IncidentStatus, Incident


# =========================================================
# 🔹 Status Serializer
# =========================================================
class IncidentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentStatus
        fields = ["id", "name"]


# =========================================================
# 🔹 Create / Update Incident
# =========================================================
class IncidentSerializer(serializers.ModelSerializer):
    status = serializers.PrimaryKeyRelatedField(
        queryset=IncidentStatus.objects.all()
    )

    class Meta:
        model = Incident
        fields = "__all__"
        read_only_fields = ["citizen", "resolved_at"]


# =========================================================
# 🔹 Image Serializer
# =========================================================
class IncidentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentImage
        fields = ["id", "incident", "image", "uploaded_at"]
        read_only_fields = ["incident", "uploaded_at"]


# =========================================================
# 🔹 List (Dashboard / Workflow)
# =========================================================
class IncidentListSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="status.name", read_only=True)
    department = serializers.SerializerMethodField()
    incident_type = serializers.CharField(source="incident_type.name", default=None)

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
            "incident_type",
        ]

    def get_department(self, obj):
        if obj.assigned_to and hasattr(obj.assigned_to, "employee_profile"):
            return obj.assigned_to.employee_profile.department.department_name
        return None


# =========================================================
# 🔹 Details (Full Data)
# =========================================================
class IncidentDetailSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="status.name", read_only=True)
    department = serializers.SerializerMethodField()
    priority = serializers.CharField(source="get_priority_display", read_only=True)
    images = IncidentImageSerializer(many=True, read_only=True)
    incident_type = serializers.CharField(source="incident_type.name", default=None)

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
            "incident_type",
            "latitude",
            "longitude",
            "images",
            "verification_image",
            "verification_comment",
        ]

    def get_department(self, obj):
        if obj.assigned_to and hasattr(obj.assigned_to, "employee_profile"):
            return obj.assigned_to.employee_profile.department.department_name
        return None

    def get_verification_image(self, obj):
        if hasattr(obj, "verification") and obj.verification:
            return obj.verification.image
        return None

    def get_verification_comment(self, obj):
        if hasattr(obj, "verification") and obj.verification:
            return obj.verification.comment
        return None
    
# =========================================================
# 🔔 Notification Serializer
# =========================================================
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["id", "title", "message", "is_read", "created_at"]    