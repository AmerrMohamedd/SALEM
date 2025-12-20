from rest_framework import serializers
from .models import user
from django.contrib.auth.hashers import make_password
from .models import *



class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['full_name', 'email', 'password', 'phone', 'birth_date', 'role']

    def create(self, validated_data):
        pwd = validated_data.pop('password')
        u = user(**validated_data)
        u.password = make_password(pwd)  # تشفير الباسورد
        u.save()
        return u

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)