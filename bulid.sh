#!/bin/bash
# أي خطأ في أي خطوة يوقف التنفيذ
set -o errexit

# تثبيت المكتبات المطلوبة
pip install -r requirements.txt

# جمع ملفات static في STATIC_ROOT
python manage.py collectstatic --noinput

# عمل أي migrations لقاعدة البيانات
python manage.py migrate