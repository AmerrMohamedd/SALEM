# توثيق الـ API – SALEM

الـ Base URL (مثال): `http://localhost:8000`

الـ Auth: كل الـ endpoints اللي تحتاج تسجيل دخول تتطلب الهيدر:
`Authorization: Bearer <access_token>`

---

## 1. Accounts (الحسابات)

### 1.1 بيانات التسجيل (قوائم التنسيقات)
- **الاسم:** Registration Metadata
- **المسار:** `GET /registration-data/`
- **Auth:** لا
- **الطلب:** لا body
- **الاستجابة (200):**
```json
{
  "departments": [
    { "id": 1, "department_name": "..." }
  ],
  "regions": [
    { "id": 1, "region_name": "..." }
  ],
  "roles": [
    { "id": "technician", "name": "Technician" },
    { "id": "operator", "name": "Operator" },
    { "id": "admin", "name": "Admin" },
    { "id": "supervisor", "name": "Supervisor" }
  ]
}
```

---

### 1.2 تسجيل مستخدم جديد (Sign Up)
- **الاسم:** Sign Up
- **المسار:** `POST /signup/`
- **Auth:** لا
- **Body (مواطن – citizen):**
```json
{
  "user_type": "citizen",
  "username": "string",
  "email": "user@example.com",
  "password": "string",
  "national_id": "12345678901234",
  "phone_number": "01234567890",
  "birth_date": "2000-01-01"
}
```
- **Body (موظف – employee):**
```json
{
  "user_type": "employee",
  "username": "string",
  "email": "user@example.com",
  "password": "string",
  "national_id": "12345678901234",
  "department": 1,
  "region": 1,
  "role": "technician"
}
```
- **استجابة نجاح (201):** نفس بيانات المستخدم (بدون password)، مع `uuid`, `username`, `email`, `user_type`, `national_id`.
- **استجابة خطأ (400):** `{"message": "Invalid user type"}` أو `serializer.errors` (أخطاء الحقول).

---

### 1.3 تسجيل الدخول (Login)
- **الاسم:** Login
- **المسار:** `POST /login/`
- **Auth:** لا
- **Body:** إما email أو national_id (واحد منهم كافي) + password
```json
{
  "email": "user@example.com",
  "password": "string"
}
```
أو
```json
{
  "national_id": "12345678901234",
  "password": "string"
}
```
- **استجابة نجاح (200):**
```json
{
  "message": "تم تسجيل الدخول بنجاح",
  "tokens": {
    "refresh": "string",
    "access": "string"
  },
  "user_info": {
    "username": "string",
    "user_type": "citizen | employee",
    "email": "string",
    "role": "citizen | technician | operator | admin | supervisor"
  }
}
```
- **استجابة خطأ (400):** `serializer.errors` (مثل: "بيانات الدخول غير صحيحة").

---

### 1.4 تسجيل الخروج (Logout)
- **الاسم:** Logout
- **المسار:** `POST /logout/`
- **Auth:** نعم
- **Body:**
```json
{
  "refresh": "refresh_token_string"
}
```
- **استجابة نجاح (205):** `{"message": "تم تسجيل الخروج بنجاح"}`
- **استجابة خطأ (400):** `{"message": "التوكن غير صالح أو تم استخدامه من قبل"}`

---

### 1.5 نسيان كلمة المرور
- **الاسم:** Forgot Password (من مكتبة django_rest_passwordreset)
- **المسار:** تحت `POST /forgot-password/` (تفاصيل المسارات في الـ package).
- **Auth:** لا
- **Body (مثال إرسال التوكن للايميل):** عادةً `{"email": "user@example.com"}`.
- **الاستجابة:** حسب إعدادات المكتبة.

---

### 1.6 قائمة الأقسام
- **الاسم:** Department List
- **المسار:** `GET /departments/`
- **Auth:** نعم
- **الطلب:** لا body
- **الاستجابة (200):** صفحة مُرقّمة (pagination)
```json
{
  "count": 10,
  "next": "...",
  "previous": null,
  "results": [
    { "id": 1, "department_name": "..." }
  ]
}
```

---

## 2. Incidents (البلاغات)

الـ Base: `http://localhost:8000/incidents/`

---

### 2.1 قائمة حالات البلاغ
- **الاسم:** Incident Statuses
- **المسار:** `GET /incidents/statuses/`
- **Auth:** نعم
- **الاستجابة (200):** صفحة مُرقّمة
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    { "id": 1, "name": "Pending" },
    { "id": 2, "name": "In Progress" }
  ]
}
```

---

### 2.2 قائمة البلاغات (مع فلترة وبحث وترتيب)
- **الاسم:** Incident List
- **المسار:** `GET /incidents/`
- **Auth:** نعم
- **Query params (اختياري):**
  - `status` – id الحالة (exact)
  - `assigned_to__employee_profile__department` – id القسم (exact)
  - `created_at__date__gte` – من تاريخ (YYYY-MM-DD)
  - `created_at__date__lte` – إلى تاريخ (YYYY-MM-DD)
  - `search` – بحث في `description`, `location`
  - `ordering` – مثل `created_at` أو `-created_at`
- **الاستجابة (200):**
```json
{
  "count": 20,
  "next": "...",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "location": "string | null",
      "created_at": "2025-02-13T12:00:00Z",
      "status": "Pending",
      "department": "string | null",
      "priority": "منخفضة | متوسطة | عالية"
    }
  ]
}
```

---

### 2.3 تفاصيل بلاغ واحد
- **الاسم:** Incident Detail
- **المسار:** `GET /incidents/<pk>/`
- **Auth:** نعم
- **الاستجابة (200):**
```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "location": "string | null",
  "created_at": "2025-02-13T12:00:00Z",
  "status": "Pending",
  "priority": "منخفضة | متوسطة | عالية",
  "department": "string | null",
  "latitude": "31.123456",
  "longitude": "31.123456",
  "images": [
    {
      "id": 1,
      "incident": 1,
      "image": "/media/incident_images/...",
      "uploaded_at": "2025-02-13T12:00:00Z"
    }
  ],
  "verification_image": "url | null",
  "verification_comment": "string | null"
}
```

---

### 2.4 إنشاء بلاغ
- **الاسم:** Incident Create
- **المسار:** `POST /incidents/create/`
- **Auth:** نعم (المواطن اللي يعمل الـ request هو اللي يُحفظ كـ citizen)
- **Body:**
```json
{
  "title": "string",
  "description": "string",
  "latitude": "31.123456",
  "longitude": "31.123456",
  "location": "string (optional)",
  "status": 1,
  "priority": "low | medium | high",
  "assigned_to": null
}
```
- **ملاحظة:** `citizen` لا يُرسل؛ يُؤخذ من المستخدم الحالي. `status` = id من `/incidents/statuses/`.
- **استجابة نجاح (201):** نفس شكل البلاغ (كل الحقول من الـ model).
- **استجابة خطأ (400):** `serializer.errors`.

---

### 2.5 بلاغاتي (للمواطن)
- **الاسم:** My Incidents
- **المسار:** `GET /incidents/my/`
- **Auth:** نعم
- **الاستجابة (200):** صفحة مُرقّمة، كل عنصر بنفس شكل إنشاء البلاغ (كل الحقول).

---

### 2.6 رفع صورة لبلاغ
- **الاسم:** Incident Image Upload
- **المسار:** `POST /incidents/<pk>/images/`
- **Auth:** نعم (لازم المستخدم يكون صاحب البلاغ)
- **Content-Type:** `multipart/form-data`
- **Body:** حقل واحد اسمه `image` (ملف صورة)
- **استجابة نجاح (201):**
```json
{
  "id": 1,
  "incident": 1,
  "image": "/media/incident_images/...",
  "uploaded_at": "2025-02-13T12:00:00Z"
}
```

---

### 2.7 إحصائيات الداشبورد (موظفين فقط)
- **الاسم:** Dashboard Stats
- **المسار:** `GET /incidents/dashboard/stats/`
- **Auth:** نعم (موظف فقط)
- **الاستجابة (200):**
```json
{
  "total": 100,
  "pending": 20,
  "in_progress": 15,
  "rejected": 5,
  "resolved_today": 3
}
```

---

### 2.8 إحصائيات أسبوعية (رسم خطي)
- **الاسم:** Weekly Stats
- **المسار:** `GET /incidents/dashboard/weekly/`
- **Auth:** نعم (موظف فقط)
- **الاستجابة (200):**
```json
[
  { "day": "2025-02-08", "count": 5 },
  { "day": "2025-02-09", "count": 8 }
]
```

---

### 2.9 أحدث البلاغات (للداشبورد)
- **الاسم:** Recent Incidents
- **المسار:** `GET /incidents/dashboard/recent/`
- **Auth:** نعم (موظف فقط)
- **الاستجابة (200):**
```json
[
  {
    "id": 1,
    "date": "2025-02-13T12:00:00Z",
    "status": "In Progress",
    "department": "string | null"
  }
]
```
(آخر 3 بلاغات.)

---

### 2.10 البلاغات حسب القسم (رسم دائري)
- **الاسم:** Incidents By Department
- **المسار:** `GET /incidents/dashboard/by-department/`
- **Auth:** نعم (موظف فقط)
- **الاستجابة (200):**
```json
[
  { "department": "قسم الصيانة", "count": 10 },
  { "department": "قسم الكهرباء", "count": 5 }
]
```

---

### 2.11 قبول بلاغ (موظف)
- **الاسم:** Accept Incident
- **المسار:** `PATCH /incidents/<pk>/accept/`
- **Auth:** نعم (موظف فقط)
- **Body:** فارغ أو `{}`
- **استجابة نجاح (200):** `{"message": "Incident accepted successfully."}`
- **استجابة خطأ (400):** `{"error": "Incident already assigned."}` أو `{"error": "Only pending incidents can be accepted."}`
- **استجابة خطأ (403):** PermissionDenied (مثلاً موظف يقبل بلاغه).

---

### 2.12 تغيير حالة بلاغ (موظف معين على البلاغ)
- **الاسم:** Change Incident Status
- **المسار:** `PATCH /incidents/<pk>/change-status/`
- **Auth:** نعم (الموظف المعين على البلاغ فقط)
- **Body:**
```json
{
  "status": "In Progress"
}
```
القيم المسموحة حسب الحالة الحالية:
- من **Assigned** → `"In Progress"`
- من **In Progress** → `"Review"`
- من **Review** → `"Completed"`
- **استجابة نجاح (200):**
```json
{
  "message": "Status updated successfully.",
  "incident_id": 1,
  "new_status": "In Progress",
  "resolved_at": "2025-02-13T14:00:00Z | null"
}
```
- **استجابة خطأ (400):** `{"error": "Incident must be accepted first."}` أو `{"error": "Status is required."}` أو `{"error": "Invalid status."}` أو `{"error": "Invalid status transition."}`

---

### 2.13 تاريخ البلاغات (المُحلّة)
- **الاسم:** Incident History
- **المسار:** `GET /incidents/history/`
- **Auth:** نعم
- **Query params (اختياري):**
  - `street` – جزء من العنوان (location)
  - `date` – تاريخ (YYYY-MM-DD)
  - `priority` – low | medium | high
- **الاستجابة (200):**
```json
{
  "stats": {
    "total_incidents": 50,
    "most_common_priority": { "priority": "medium", "count": 20 },
    "average_resolution_time": "1 day, 2:30:00"
  },
  "results": [
    {
      "id": 1,
      "title": "string",
      "location": "string | null",
      "priority": "low | medium | high",
      "created_at": "2025-02-10T12:00:00Z",
      "resolved_at": "2025-02-12T14:00:00Z",
      "resolution_time": "2 days, 2:00:00"
    }
  ]
}
```

---

## ملخص سريع بالمسارات

| الاسم | Method | المسار |
|------|--------|--------|
| Registration Metadata | GET | `/registration-data/` |
| Sign Up | POST | `/signup/` |
| Login | POST | `/login/` |
| Logout | POST | `/logout/` |
| Forgot Password | (انظر المكتبة) | `/forgot-password/` |
| Department List | GET | `/departments/` |
| Incident Statuses | GET | `/incidents/statuses/` |
| Incident List | GET | `/incidents/` |
| Incident Detail | GET | `/incidents/<pk>/` |
| Incident Create | POST | `/incidents/create/` |
| My Incidents | GET | `/incidents/my/` |
| Incident Image Upload | POST | `/incidents/<pk>/images/` |
| Dashboard Stats | GET | `/incidents/dashboard/stats/` |
| Weekly Stats | GET | `/incidents/dashboard/weekly/` |
| Recent Incidents | GET | `/incidents/dashboard/recent/` |
| By Department | GET | `/incidents/dashboard/by-department/` |
| Accept Incident | PATCH | `/incidents/<pk>/accept/` |
| Change Status | PATCH | `/incidents/<pk>/change-status/` |
| Incident History | GET | `/incidents/history/` |
