#!/bin/bash
# أي خطأ في أي خطوة يوقف التنفيذ
set -o errexit

# تثبيت المكتبات المطلوبة
pip install -r requirements.txt

# جمع ملفات static في STATIC_ROOT
python3 manage.py collectstatic --noinput

# عمل أي migrations لقاعدة البيانات
python3 manage.py migrate