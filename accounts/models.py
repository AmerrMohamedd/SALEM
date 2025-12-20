from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# create the user model using abstractuser 

class Role(models.Model):
        role_name = models.CharField(max_length=20)


        def __str__(self):
            return self.role_name



# create the user model using abstractuser 
class user(models.Model):
    full_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=20)
    phone = models.CharField(max_length=11, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    role = models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
        default=None  # نخلي default None عشان نعالج قبل الحفظ
    )

    def save(self, *args, **kwargs):
        if not self.role:
            # لو ما حطش role ناخد 'citizen' من قاعدة البيانات أو نعمله لو مش موجود
            self.role, created = Role.objects.get_or_create(role_name='citizen')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name
    
    
class extended_info(models.Model):
     
     user_id = models.OneToOneField( user , on_delete=models.CASCADE , related_name="extended_info" )
     organization_department = models.CharField(max_length=50 , blank=True)
     city_resion = models.CharField(max_length=50 , blank=True)

