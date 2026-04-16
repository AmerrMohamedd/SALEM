"""
DRF exception handler — consistent JSON for API clients.
"""
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    if response is None:
        return None

    if isinstance(response.data, dict):
        payload = {"success": False, "errors": response.data}
    else:
        payload = {"success": False, "errors": response.data}

    return Response(payload, status=response.status_code)
