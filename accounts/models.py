from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


# # the worker users is:

# class Role(models.Model):
#         role_name = models.CharField(max_length=20)


#         def __str__(self):
#             return self.role_name

# # Departments class if we need to add the departments from the admin panel

# class Departments(models.Model):
#     departments_name = models.CharField(max_length=40)

#     def __str__(self):
#         return self.departments_name


# # create the user model using abstractuser 
# class User(AbstractUser):
#     # email , password --> already exist in the abstractuser model
#     uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
#     username = models.CharField(max_length=150, unique=True, null=True, blank=True)
#     email = models.EmailField(unique=True)
#     # her if the depar is deleted the user will be deleted too !!!
#     department = models.ForeignKey(Departments, on_delete=models.CASCADE, null=True, blank=True)
#     role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)
#     region = models.CharField(max_length=50, blank=True)


class Department(models.Model):

    department_name = models.CharField(max_length=100 , unique=True)
    description = models.TextField(blank=True , null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.department_name

class Region(models.Model):

    region_name = models.CharField(max_length=50 , unique=True)
    description = models.TextField(blank=True , null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.region_name
    


class User(AbstractUser):

    user_type_choices = [
        ('citizen' , 'Citizen'),
        ('employee' , 'Employee'),
    ]

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user_type = models.CharField(max_length=20, choices=user_type_choices, default='citizen')
    national_id = models.CharField(max_length=14, unique=True)

    # the other fields is already exist in the abstractuser model like email , password , username , ....)

class EmployeeProfile(models.Model):

    ROLE_CHOICES = [
        ('technician', 'Technician'),
        ('operator', 'Operator'),
        ('admin', 'Admin'),
        ('supervisor', 'Supervisor'),
    ]

    
    employee_id = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    region = models.ForeignKey(Region, on_delete=models.PROTECT)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return self.role

    

class CitizenProfile(models.Model):

    citizen_id = models.OneToOneField(User, on_delete=models.CASCADE, related_name='citizen_profile')
    phone_number = models.CharField(max_length=11 ,  unique=True)
    birth_date = models.DateField()


    def __str__(self):
        return self.citizen_id.username





# for forgetpassword email sending 

from django.core.mail import send_mail
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # ده نص الرسالة اللي هتروح لليوزر
    email_plaintext_message = f"استخدم هذا الرمز لإعادة تعيين كلمة المرور: {reset_password_token.key}"

    send_mail(
        "Password Reset Token",
        f"Your token is: {reset_password_token.key}",
        "noreply@yourdomain.com",
        [reset_password_token.user.email]
    )