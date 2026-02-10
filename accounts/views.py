from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.


# class SignUpView(APIView):    # user_local_host_port/signup ---> the Api
    
#     def get(self , request):
#         users = User.objects.all()
#         serializer = SignupSerializer(users , many=True)
#         return Response(serializer.data , status = status.HTTP_200_OK)
    
#     def post(self , request):
#         serializer  = SignupSerializer(data  = request.data)
#         if serializer.is_valid():
#             if User.objects.filter(email = serializer.validated_data['email']).exists():
#                 return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
#             serializer.save()
#             return Response(serializer.data , status = status.HTTP_201_CREATED)
#         return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)



# class LoginView(APIView):
#     def post(self, request):
#         # 1. بنبعت البيانات اللي جاية من الـ front للـ serializer
#         serializer = LoginSerializer(data=request.data)
        
#         # 2. بنشغل دالة الـ validate اللي شرحناها سطر بسطر
#         if serializer.is_valid():
#             # 3. لو البيانات صح، بنسحب الـ user اللي السيرياليزر جهزهولنا
#             user = serializer.validated_data['user']
            
#             # 4. دي أهم خطوة: بنعمل Login فعلي ونفتح Session لليوزر
#             login(request, user)
            
#             # 5. بنرد على الـ front ببيانات اليوزر عشان يعرضها عنده
#             user_data = SignupSerializer(user).data
#         return Response({
#             "message": "تم تسجيل الدخول بنجاح",
#             "user_info": user_data  # هيرجع كل الحقول اللي في الـ Meta بتاع SignupSerializer
#         }, status=status.HTTP_200_OK)
        
#         # 6. لو البيانات غلط، بنرد عليه بالأخطاء (زي "الايميل غير صحيح")
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# # forget password
# @api_view(['POST'])
# def forget_password_view(request):  # user_local_host_port/forgetpassword ---> the Api
    
#     email = request.data.get('email')
#     new_password = request.data.get('new_password')

#     if not email or not new_password:
#         return Response({"message": "Email and new password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
#     try:
#         u = user.objects.get(email=email)
#         u.password = make_password(new_password)
#         u.save()
#         return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
#     except user.DoesNotExist:
#         return Response({"message": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)




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
            
            return Response({
                "message": "تم تسجيل الدخول بنجاح",
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                "user_info": {
                    "username": user.username,
                    "user_type": user.user_type, # 'citizen' أو 'employee'
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)