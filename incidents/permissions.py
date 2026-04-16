"""
Custom DRF permissions for SALEM incidents API.
"""
from rest_framework import permissions


class IsEmployee(permissions.BasePermission):
    """User must be authenticated and have an EmployeeProfile."""

    message = "Only employees can access this resource."

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and hasattr(user, "employee_profile")
        )


class IsCitizen(permissions.BasePermission):
    """User must be authenticated as a citizen (not employee workflow account)."""

    message = "Only citizens can perform this action."

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and getattr(user, "user_type", None) == "citizen"
        )


class CanViewIncident(permissions.BasePermission):
    """
    Employees may view any incident.
    Citizens may view only incidents they created.
    """

    message = "You do not have permission to view this incident."

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if hasattr(user, "employee_profile"):
            return True
        return obj.citizen_id == user.id


class IsAssignedEmployee(permissions.BasePermission):
    """Only the employee assigned to this incident may act on it."""

    message = "Only the assigned employee can change status for this incident."

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if not hasattr(user, "employee_profile"):
            return False
        return obj.assigned_to_id == user.id
