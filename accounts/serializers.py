from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *
from django.db import transaction
from django.contrib.auth.password_validation import validate_password

# --- 1. الـ Serializers الأساسية ---
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'department_name']

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'region_name']

# --- 2. السيرياليزر الأساسي للتسجيل ---
class BaseSingupSerializer(serializers.ModelSerializer):
    user_type = serializers.ChoiceField(choices=User.user_type_choices)
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['uuid', 'username', 'email', 'password', 'user_type', 'national_id', 'phone_number']
        read_only_fields = ['uuid']
    
    def validate_national_id(self, value):
        if not value.isdigit() or len(value) != 14:
            raise serializers.ValidationError("National ID must be a 14-digit number.")
        return value

# --- 3. تسجيل الموظف ---
class EmployeeSignupSerializer(BaseSingupSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), write_only=True)
    region = serializers.PrimaryKeyRelatedField(queryset=Region.objects.all(), write_only=True)
    role = serializers.ChoiceField(choices=EmployeeProfile.ROLE_CHOICES, write_only=True)

    class Meta(BaseSingupSerializer.Meta):
        fields = BaseSingupSerializer.Meta.fields + ['department', 'region', 'role']

    def create(self, validated_data):
        dep = validated_data.pop('department')
        reg = validated_data.pop('region')
        role = validated_data.pop('role')
        validated_data["user_type"] = "employee"
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            EmployeeProfile.objects.create(
                employee_id=user,
                department=dep,
                region=reg,
                role=role
            )
        return user

# --- 4. تسجيل المواطن ---
class CitizenSignupSerializer(BaseSingupSerializer):
    birth_date = serializers.DateField(write_only=True)

    class Meta(BaseSingupSerializer.Meta):
        fields = BaseSingupSerializer.Meta.fields + ['birth_date']

    def create(self, validated_data):
        birth_date = validated_data.pop('birth_date')
        validated_data["user_type"] = "citizen"
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            CitizenProfile.objects.create(
                citizen_id=user,
                birth_date=birth_date
            )
        return user

# --- 5. تعديل بيانات الملف الشخصي (Update) ---
class UserUpdateSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'birth_date']

    def update(self, instance, validated_data):
        birth_date = validated_data.pop('birth_date', None)
        # تحديث بيانات الـ User
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # تحديث تاريخ الميلاد لو مواطن
        if instance.user_type == 'citizen' and birth_date:
            profile, _ = CitizenProfile.objects.get_or_create(citizen_id=instance)
            profile.birth_date = birth_date
            profile.save()
        return instance

# --- 6. تغيير كلمة المرور (ده اللي كان ناقص) ---
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

# --- 7. تسجيل الدخول ---
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