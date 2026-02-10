
from django.urls import path , include
from .views import *
urlpatterns = [
    path("registration-data/", RegistrationMetadataView.as_view(), name=""),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/' , LoginView.as_view() , name='login'),
    path('forgot-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    # path('forgetpassword/', forget_password_view, name='forget_password'),
]
