from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics





class RegistrationMetadataView(APIView):   # user_local_host_port/registration-data ---> the Api


    def get(self, request):
        
        department = Department.objects.all()
        region = Region.objects.all()

        role = [
            {'id':key , 'name':value} for key , value in EmployeeProfile.ROLE_CHOICES
        ]

        return Response({
            'departments': DepartmentSerializer(department , many=True).data,
            'regions': RegionSerializer(region , many=True).data,
            'roles': role
        })





class SignUpView(APIView):    # user_local_host_port/signup ---> the Api

    def post(self, request):

        user_type = request.data.get('user_type')

        if user_type == 'citizen':
            serializer = CitizenSignupSerializer(data=request.data)
        elif user_type == 'employee':
            serializer = EmployeeSignupSerializer(data=request.data)
        else:
            return Response({"message": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
        
            serializer.save()
            return Response(serializer.data , status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)


            role = None
            department_name = None
            region_name = None
            phone_number = None


            if user.user_type == 'employee' and hasattr(user, 'employee_profile'):
                profile = user.employee_profile
                role = profile.role
        
                if profile.department:
                    department_name = profile.department.department_name
                if profile.region:
                    region_name = profile.region.region_name
            

            elif user.user_type == 'citizen':
                role = "citizen"

                if hasattr(user, 'citizen_profile') and user.citizen_profile.phone_number:
                    phone_number = user.citizen_profile.phone_number


            
            return Response({
                "message": "تم تسجيل الدخول بنجاح",
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                "user_info": {
                    "username": user.username,
                    "user_type": user.user_type,
                    "email": user.email,
                    "national_id": user.national_id, 
                    "role": role,
                    "department": department_name,
                    "region": region_name,  
                    "phone_number": phone_number     
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            
            token.blacklist()
            
            return Response({"message": "تم تسجيل الخروج بنجاح"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"message": "التوكن غير صالح أو تم استخدامه من قبل"}, status=status.HTTP_400_BAD_REQUEST)
        

# Dashboard Api #6 -Get Incident departments
class DepartmentListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer        



    