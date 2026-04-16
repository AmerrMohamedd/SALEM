from rest_framework import serializers
from .models import (
    Incident,
    IncidentHistory,
    IncidentImage,  
    IncidentStatus,
    Notification,
)


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
        queryset=IncidentStatus.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Incident
        fields = "__all__"
        read_only_fields = ["citizen", "resolved_at", "assigned_to", "created_at"]

    def create(self, validated_data):
        if not validated_data.get("status"):
            validated_data["status"] = IncidentStatus.objects.get(
                name=IncidentStatus.StatusChoices.NEW
            )
        return super().create(validated_data)


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
    incident_type = serializers.SerializerMethodField()

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

    def get_incident_type(self, obj):
        return obj.incident_type.name if obj.incident_type else None

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
    incident_type = serializers.SerializerMethodField()

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
            "resolved_at",
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

    def get_incident_type(self, obj):
        return obj.incident_type.name if obj.incident_type else None

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


class IncidentHistorySerializer(serializers.ModelSerializer):
    old_status = serializers.CharField(
        source="old_status.name", read_only=True, allow_null=True
    )
    new_status = serializers.CharField(source="new_status.name", read_only=True)

    class Meta:
        model = IncidentHistory
        fields = [
            "id",
            "incident",
            "actor",
            "old_status",
            "new_status",
            "note",
            "created_at",
        ]
        read_only_fields = fields    