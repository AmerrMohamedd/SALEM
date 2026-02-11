from django.contrib import admin
from .models import (
    IncidentStatus,
    Incident,
    IncidentImage,
    RepairVerification
)

admin.site.register(IncidentStatus)
admin.site.register(Incident)
admin.site.register(IncidentImage)
admin.site.register(RepairVerification)
