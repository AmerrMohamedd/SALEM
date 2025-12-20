
from django.urls import path
from .views import *
urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', login_view, name='login'),
    path('forgetpassword/', forget_password_view, name='forget_password'),
]
