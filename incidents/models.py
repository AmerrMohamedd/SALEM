from django.db import models
from django.conf import settings


# Model detect statue of a report (Pending, In Progress,Resolved and Rejected)
class IncidentStatus(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# Report contain title, description, latitude, latitude, status and created at
class Incident(models.Model):
    citizen = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="incidents"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()

    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    location = models.CharField(max_length=255, blank=True, null=True)


    status = models.ForeignKey(
        IncidentStatus,
        on_delete=models.PROTECT,
        related_name="incidents"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_incidents"
    )

    PRIORITY_CHOICES = [
    ('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High'),
    ]

    priority = models.CharField(
    max_length=10,
    choices=PRIORITY_CHOICES,
    default='medium'
    )

    

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Responsible for image of report     
class IncidentImage(models.Model):
    incident = models.ForeignKey(
        Incident,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="incident_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for Incident {self.incident.id}"


# confirmation report
class RepairVerification(models.Model):
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
        return f"Verification for Incident {self.incident.id}"