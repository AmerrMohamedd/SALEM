import os
from pathlib import Path

<<<<<<< HEAD
# Build paths inside the project like this: BASE_DIR / 'subdir'.
# بما إن ملف الإعدادات جوه مجلد backend، فـ parent.parent هيوصلنا لمجلد SALEM الرئيسي
BASE_DIR = Path(__file__).resolve().parent.parent
=======
# Optional CA bundle support for outbound HTTPS calls on some local Python installs.
try:
    import certifi
except ImportError:
    certifi = None

if certifi:
    os.environ.setdefault("SSL_CERT_FILE", certifi.where())

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(_file_).resolve().parent.parent
>>>>>>> f0e425e216992b0ea8367abd4da1f5e1beb4d3be

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-kwc*&i89x0u)kvjfo6d3c=&iu=jxb1rt&2qilb&nbn41-+%)ac'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ضروري عشان الموقع يفتح على PythonAnywhere
ALLOWED_HOSTS = ['SalemProject.pythonanywhere.com', 'localhost', '127.0.0.1']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # مكتبات الـ API والـ Auth اللي المشروع بيعتمد عليها
    'rest_framework',
    'rest_framework_simplejwt',
    
    # تطبيقاتك بالأسامي الجديدة اللي في الصورة
    'users',
    'Home',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static & Media Files
# ده الجزء المسؤول عن ظهور الصور اللي شفناها في فولدر media في الصورة
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

<<<<<<< HEAD
# إعدادات الـ REST Framework عشان الـ Tokens تشتغل
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp-relay.brevo.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'aa31da001@smtp-brevo.com'
EMAIL_HOST_PASSWORD = 'ZB7nNqk0RyhzAK6C'
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'amerr.mohaamed209@gmail.com'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
=======
# Email settings (Brevo API)
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'amerr.mohaamed209@gmail.com')
BREVO_API_BASE_URL = os.getenv('BREVO_API_BASE_URL', 'https://api.brevo.com/v3')
BREVO_API_KEY = os.getenv('BREVO_API_KEY', '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')
BREVO_SENDER_EMAIL = os.getenv('BREVO_SENDER_EMAIL', DEFAULT_FROM_EMAIL)
BREVO_SENDER_NAME = os.getenv('BREVO_SENDER_NAME', 'Salem')
BREVO_EMAIL_TIMEOUT = int(os.getenv('BREVO_EMAIL_TIMEOUT', '30'))
>>>>>>> f0e425e216992b0ea8367abd4da1f5e1beb4d3be
