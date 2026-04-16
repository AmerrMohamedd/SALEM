from django.contrib import admin
from .models import (
    IncidentHistory,
    IncidentImage,
    IncidentStatus,
    IncidentType,
    Incident,
    Notification,
    RepairVerification,
)

admin.site.register(IncidentStatus)
admin.site.register(IncidentType)
admin.site.register(Incident)
admin.site.register(IncidentImage)
admin.site.register(RepairVerification)
admin.site.register(IncidentHistory)
admin.site.register(Notification)
