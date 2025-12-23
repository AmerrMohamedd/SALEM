import os
import dj_database_url
from .settings import * # بيسحب الإعدادات الأساسية عشان م نكررش كود

# 1. الأمان والبيئة
DEBUG = False

# اكتب اسم المستخدم بتاعك في PythonAnywhere مكان 'yourusername'
ALLOWED_HOSTS = [' abdullahgouda.pythonanywhere.com.', 'localhost', '127.0.0.1']

# ضروري عشان الـ Cookies والـ Admin في الرفع
CSRF_TRUSTED_ORIGINS = ['https://abdullahgouda.pythonanywhere.com']

# 2. إعدادات قاعدة البيانات (Supabase)
# استخدمنا الرابط اللي إنت بعته مباشرة
DATABASES = {
    'default': dj_database_url.config(
        default='postgresql://postgres:A.gouda123456789@db.vsfxdmsykinuqrvxftjf.supabase.co:5432/postgres',
        conn_max_age=600,
    )
}

# 3. الـ Middleware (ترتيب مهم جداً لـ WhiteNoise و CORS)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # لخدمة الملفات الثابتة
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # تيم الويب والـ API
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 4. الـ CORS عشان تيم الـ Web والموبايل يعرفوا يكلموا الـ API
CORS_ALLOW_ALL_ORIGINS = True  # بما إنك في مرحلة الـ Testing مع التيم

# 5. الملفات الثابتة (Static & Media)
# مهم جداً عشان الـ Admin panel والـ Images تظهر صح
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# 6. إعدادات إضافية لضمان عمل الـ API بشكل مستقر
# (اختياري) لو بتستخدم Rest Framework
if 'rest_framework' in INSTALLED_APPS:
    REST_FRAMEWORK = {
        'DEFAULT_RENDERER_CLASSES': [
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ],
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.AllowAny',
        ],
    }