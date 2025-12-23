import os
from pathlib import Path
from .settings import *

# 1. الأمان
DEBUG = True  # هنخليه True مؤقتاً عشان نتأكد إن الموقع هيفتح

ALLOWED_HOSTS = ['abdullahgouda.pythonanywhere.com', 'localhost', '127.0.0.1']

# 2. تعريف الـ BASE_DIR عشان ميعملش Error
BASE_DIR = Path(__file__).resolve().parent.parent

# 3. قاعدة البيانات SQLite الأصلية
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# 4. الـ Middleware الأصلي (بدون WhiteNoise)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 5. الملفات الثابتة العادية
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')