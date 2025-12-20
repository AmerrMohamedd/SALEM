import avatar from "../../assets/avatar.png";

export default function ReportDetailsPage() {
  return (
    <div className="h-full flex flex-col px-6 py-4">
      {/* ===== TITLE ===== */}
      <h2 className="text-lg font-bold text-center mb-4">التفاصيل</h2>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 grid grid-cols-12 gap-6">
        {/* ===== LEFT : IMAGES + AI ===== */}
        <div className="col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ImageCard title="بعد" />
            <ImageCard title="قبل" />
          </div>

          <TextArea label="نتيجة تحليل الـ AI الأولية للمشكلة :" />
          <TextArea label="نتيجة مقارنة الـ AI بين الصورتين (قبل وبعد) :" />
        </div>

        {/* ===== RIGHT : DETAILS ===== */}
        <div className="col-span-5 space-y-3">
          <Field label="رقم البلاغ :" />
          <Field label="نوع المشكلة :" />
          <Field label="وقت التسجيل :" />
          <Field label="العنوان بالتفصيل :" />
          <Field label="الجهة المسؤولة الحالية :" />
          <Field label="الوقت المقدر للإصلاح :" />
          <Field label="حالة البلاغ الحالية :" />
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="mt-4 pt-4 border-t flex justify-center">
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg border border-red-500 text-red-500 text-sm">
            رفض هذه الشكوى
          </button>

                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white text-sm">
            تعيين لإدارة أخرى
          </button>

                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white text-sm">
            عرض على الخريطة
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= Components ================= */

function Field({ label }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        disabled
        className="w-full rounded-md border px-2 py-1 text-sm bg-gray-50"
      />
    </div>
  );
}

function ImageCard({ title }) {
  return (
    <div className="text-center">
      <p className="mb-1 text-sm font-medium text-gray-700">{title}</p>
      <div className="bg-gray-100 rounded-xl p-3">
        <img src={avatar} alt={title}
        className="w-full h-44 object-cover rounded-lg"/>
      </div>
    </div>
  );
}

function TextArea({ label }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        disabled
        className="w-full h-20 rounded-md border p-2 text-sm bg-gray-50 resize-none"
      />
    </div>
  );
}
