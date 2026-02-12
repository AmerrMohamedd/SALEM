from rest_framework import serializers
from django.contrib.auth import authenticate
# from django.contrib.auth.hashers import make_password
from .models import *
from django.db import transaction
from django.contrib.auth.password_validation import validate_password



# class SignupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['uuid'  , 'username' , 'email' , 'password' ,'department' ,'region' ,'role' ]

    
#     def validate(self, data):
#         if not self.context.get('is_superuser' , False):
#             if not data.get('department'):
#                 raise serializers.ValidationError("Department is required for non-superusers.")
#             if not data.get('role'):
#                 raise serializers.ValidationError("Role is required for non-superusers.")
#             if not data.get('region'):
#                 raise serializers.ValidationError("Region is required for non-superusers.")
#         return data


#     def create(self , validated_data):
#         password = validated_data.pop('password')
#         user = User(**validated_data)
#         user.set_password(password)
#         user.save()
#         return user


# class LoginSerializer(serializers.ModelSerializer):

#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['email', 'password']

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')

#         try:
#             user_obj  = User.objects.get(email=email)
#             user = authenticate(username=user_obj.username, password=password)

#         except User.DoesNotExist:
#             user = None
        
#         if not user:
#             raise serializers.ValidationError("Invalid email or password.")
#         data['user'] = user
#         return data



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id' , 'department_name']

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id' , 'region_name']



class BaseSingupSerializer(serializers.ModelSerializer):
    

    user_type = serializers.ChoiceField(choices=User.user_type_choices)

    password = serializers.CharField(write_only=True , validators=[validate_password])

    class Meta:
        model = User
        fields = ['uuid' ,'username' ,'email' ,'password' ,'user_type' , 'national_id']
        read_only_fields = ['uuid']
    
    def validate_national_id(self , value):
        if not value.isdigit() or len(value) != 14:
            raise serializers.ValidationError("National ID must be a 14-digit number.")
        return value
    

class EmployeeSignupSerializer(BaseSingupSerializer):

    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all() , write_only=True)
    region = serializers.PrimaryKeyRelatedField(queryset=Region.objects.all(), write_only=True)
    role = serializers.ChoiceField(choices=EmployeeProfile.ROLE_CHOICES , write_only=True)

    class Meta(BaseSingupSerializer.Meta):
        fields = BaseSingupSerializer.Meta.fields + ['department' , 'region' , 'role']

    def create(self , validated_data):

        dep = validated_data.pop('department')
        reg = validated_data.pop('region')
        role = validated_data.pop('role')

        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            EmployeeProfile.objects.create(
                employee_id = user,
                department = dep,
                region = reg,
                role = role
            )
        return user
    

class CitizenSignupSerializer(BaseSingupSerializer):

    phone_number = serializers.CharField(max_length=11, min_length=11, write_only=True)
    birth_date = serializers.DateField(write_only=True)


    class Meta(BaseSingupSerializer.Meta):
        fields = BaseSingupSerializer.Meta.fields + ['phone_number' , 'birth_date']

    def create(self , validated_data):

        phone_number = validated_data.pop('phone_number')
        birth_date = validated_data.pop('birth_date')

        with transaction.atomic():
            user  = User.objects.create_user(**validated_data)
            CitizenProfile.objects.create(
                citizen_id = user,
                phone_number = phone_number,
                birth_date = birth_date
            )
        return user
    


class LoginSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=False, allow_blank=True)
    national_id = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)


    class Meta:
        model = User
        fields = ['email', 'national_id', 'password']

    def validate(self, attrs):
        email = attrs.get('email')
        national_id = attrs.get('national_id')
        password = attrs.get('password')

        if not email and not national_id:
            raise serializers.ValidationError("Either email or national ID must be provided.")


        if not password:
            raise serializers.ValidationError("Password is required.")

        user = None

        try:

            if email:
                user_obj = User.objects.get(email=email)
            else:
                
                user_obj = User.objects.get(national_id=national_id)

            
            user = authenticate(username=user_obj.username, password=password)
            
        except User.DoesNotExist:
            
            pass 

        if not user:
            raise serializers.ValidationError("بيانات الدخول غير صحيحة.")

        if not user.is_active:
            raise serializers.ValidationError("هذا الحساب معطل.")


        attrs['user'] = user
        return attrs

 # show all department of report   
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "department_name"]    