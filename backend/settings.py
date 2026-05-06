import os
from pathlib import Path

# Optional CA bundle support for outbound HTTPS calls on some local Python installs.
try:
    import certifi
except ImportError:
    certifi = None

if certifi:
    os.environ.setdefault("SSL_CERT_FILE", certifi.where())

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(_file_).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-kwc*&i89x0u)kvjfo6d3c=&iu=jxb1rt&2qilb&nbn41-+%)ac'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Email settings (Brevo API)
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'amerr.mohaamed209@gmail.com')
BREVO_API_BASE_URL = os.getenv('BREVO_API_BASE_URL', 'https://api.brevo.com/v3')
BREVO_API_KEY = os.getenv('BREVO_API_KEY', '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')
BREVO_SENDER_EMAIL = os.getenv('BREVO_SENDER_EMAIL', DEFAULT_FROM_EMAIL)
BREVO_SENDER_NAME = os.getenv('BREVO_SENDER_NAME', 'Salem')
BREVO_EMAIL_TIMEOUT = int(os.getenv('BREVO_EMAIL_TIMEOUT', '30'))