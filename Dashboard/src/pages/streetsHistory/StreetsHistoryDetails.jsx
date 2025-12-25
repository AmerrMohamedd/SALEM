import avatar from "../../assets/avatar.png";

export default function StreetsHistoryDetails({ report, onOpenMap }) {
  if (!report) return null;

  return (
    <div className="h-full flex flex-col px-6 py-4 bg-white rounded-xl ">
      {/* ===== TITLE ===== */}
      <h2 className="text-lg font-bold text-center mb-4">
        الإجراءات
      </h2>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 grid grid-cols-12 gap-6">
        {/* ===== LEFT : IMAGES + AI ===== */}
        <div className="col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ImageCard title="بعد" />
            <ImageCard title="قبل" />
          </div>

          <TextArea
            label="نتيجة تحليل الـ AI الأولية للمشكلة :"
            value={`تصنيف مبدئي لمشكلة ${report.category}`}
          />

          <TextArea
            label="نتيجة مقارنة الـ AI بين الصورتين :"
            value="لا يوجد تغيير ملحوظ حتى الآن"
          />
        </div>

        {/* ===== RIGHT : DETAILS ===== */}
        <div className="col-span-5 space-y-3">
          <Field label="رقم البلاغ :" value={report.id} />
          <Field label="نوع المشكلة :" value={report.category} />
          <Field label="تاريخ التسجيل :" value={report.date} />
          <Field label="الحالة :" value={report.status} />
          <Field label="زمن الإصلاح :" value={report.repairTime} />
          <Field label="الجهة المسؤولة :" value={report.process} />
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="mt-4 pt-4 border-t flex justify-center">        
          <button onClick={onOpenMap}
          className="px-4 py-2 bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white rounded-lg text-sm">
            عرض على الخريطة
          </button>
          </div>
    </div>
  );
}

/* ================= Components ================= */

function Field({ label, value }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input disabled value={value ?? "—"}
      className="w-full rounded-md border px-2 py-1 text-sm bg-gray-50"/>
    </div>
  );
}

function ImageCard({ title }) {
  return (
    <div className="text-center">
      <p className="mb-1 text-sm font-medium text-gray-700">
        {title}
      </p>
      <img src={avatar} alt={title}
      className="w-full h-44 object-cover rounded-lg border"/>
    </div>
  );
}

function TextArea({ label, value }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea disabled value={value}
      className="w-full h-20 rounded-md border p-2 text-sm bg-gray-50 resize-none"/>
    </div>
  );
}
