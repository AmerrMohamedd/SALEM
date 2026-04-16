from django.db import migrations


def seed_statuses(apps, schema_editor):
    IncidentStatus = apps.get_model("incidents", "IncidentStatus")
    for name, _label in [
        ("NEW", "New"),
        ("ASSIGNED", "Assigned"),
        ("IN_PROGRESS", "In Progress"),
        ("REVIEW", "Under Review"),
        ("COMPLETED", "Completed"),
    ]:
        IncidentStatus.objects.get_or_create(name=name, defaults={"description": ""})


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("incidents", "0010_incidenthistory"),
    ]

    operations = [
        migrations.RunPython(seed_statuses, noop_reverse),
    ]
