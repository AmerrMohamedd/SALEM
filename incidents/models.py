from django.db import models
from django.conf import settings


# =========================================================
# 🔥 Incident Status (Controlled via ENUM)
# =========================================================
class IncidentStatus(models.Model):
    """
    Represents the status of an incident.
    Controlled using fixed choices to avoid inconsistency.
    """

    class StatusChoices(models.TextChoices):
        NEW = "NEW", "New"
        ASSIGNED = "ASSIGNED", "Assigned"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        REVIEW = "REVIEW", "Under Review"
        COMPLETED = "COMPLETED", "Completed"

    name = models.CharField(
        max_length=50,
        choices=StatusChoices.choices,
        unique=True
    )

    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


# =========================================================
# 📌 Incident Type (e.g., Roads, Electricity, Gas)
# =========================================================
class IncidentType(models.Model):
    """
    Defines categories of incidents.
    Example: Roads, Electricity, Gas
    """

    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# =========================================================
# ⚡ Priority ENUM
# =========================================================
class PriorityChoices(models.TextChoices):
    LOW = "LOW", "Low"
    MEDIUM = "MEDIUM", "Medium"
    HIGH = "HIGH", "High"


# =========================================================
# 🧾 Main Incident Model
# =========================================================
class Incident(models.Model):
    """
    Core model representing a reported issue.
    """

    # 👤 Citizen who created the incident
    citizen = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="incidents"
    )

    # 📝 Basic information
    title = models.CharField(max_length=200)
    description = models.TextField()

    # 📍 Location data
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    location = models.CharField(max_length=255, blank=True, null=True)

    # 🔄 Status
    status = models.ForeignKey(
        IncidentStatus,
        on_delete=models.PROTECT,
        related_name="incidents"
    )

    # 👷 Assigned employee
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_incidents"
    )

    # ⚡ Priority
    priority = models.CharField(
        max_length=10,
        choices=PriorityChoices.choices,
        default=PriorityChoices.MEDIUM
    )

    # 🏷️ Type of incident
    incident_type = models.ForeignKey(
        IncidentType,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="incidents"
    )

    # ⏱️ Time tracking
    resolved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Incident #{self.id} - {self.title}"


# =========================================================
# 🖼️ Incident Images
# =========================================================
class IncidentImage(models.Model):
    """
    Stores images related to an incident.
    """

    incident = models.ForeignKey(
        Incident,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="incident_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for Incident #{self.incident.id}"


# =========================================================
# ✅ Repair Verification
# =========================================================
class RepairVerification(models.Model):
    """
    Confirms that an incident has been resolved.
    """

    incident = models.OneToOneField(
        Incident,
        on_delete=models.CASCADE,
        related_name="verification"
    )

    comment = models.TextField(blank=True, null=True)

    image = models.ImageField(
        upload_to="repair_verifications/",
        blank=True,
        null=True
    )

    verified_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Verification for Incident #{self.incident.id}"
    
# =========================================================
# 🔔 Notification Model
# =========================================================
class Notification(models.Model):
    """
    Stores notifications for users (employees / citizens)
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    title = models.CharField(max_length=255)
    message = models.TextField()

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.title}"