"""Domain services for incidents (audit trail, helpers)."""
from django.db import transaction

from .models import IncidentHistory


def normalize_incident_status_name(raw):
    """
    Normalize client input (e.g. IN_PROGRESS, in progress) to IncidentStatus.name values.
    """
    if raw is None:
        return None
    s = str(raw).strip().upper().replace(" ", "_").replace("-", "_")
    aliases = {
        "INPROGRESS": "IN_PROGRESS",
        "UNDER_REVIEW": "REVIEW",
        "DONE": "COMPLETED",
        "COMPLETE": "COMPLETED",
        "RESOLVED": "COMPLETED",
    }
    return aliases.get(s, s)


def log_incident_history(*, incident, actor, old_status, new_status, note=""):
    """
    Persist a status transition (or assignment milestone) for auditing.
    old_status may be None for the first entry.
    """
    with transaction.atomic():
        IncidentHistory.objects.create(
            incident=incident,
            actor=actor,
            old_status=old_status,
            new_status=new_status,
            note=note or "",
        )
