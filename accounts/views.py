from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
# Create your views here.


class SignUpView(APIView):    # user_local_host_port/signup ---> the Api
    
    def get(self, request):
        users = user.objects.all()
        serializer = SignUpSerializer(users, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            if user.objects.filter(email=serializer.validated_data['email']).exists():
                return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):    # user_local_host_port/login ---> the Api
    
    serializer = LoginSerializer(data = request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            u = user.objects.get(email=email)
            if check_password(password, u.password):
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid email"}, status=status.HTTP_401_UNAUTHORIZED)
        except user.DoesNotExist:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# forget password
@api_view(['POST'])
def forget_password_view(request):  # user_local_host_port/forgetpassword ---> the Api
    
    email = request.data.get('email')
    new_password = request.data.get('new_password')

    if not email or not new_password:
        return Response({"message": "Email and new password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        u = user.objects.get(email=email)
        u.password = make_password(new_password)
        u.save()
        return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
    except user.DoesNotExist:
        return Response({"message": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)