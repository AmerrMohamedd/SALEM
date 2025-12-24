function ReportsTableHeader() {
    return (
        <div
            className="mt-4 bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
      text-white rounded-xl px-4 py-3 text-sm font-semibold"
        >
            <div className="grid grid-cols-8 text-center">
                <div>رقم البلاغ (ID)</div>
                <div>التصنيف</div>
                <div>الموقع</div>
                <div>التاريخ</div>
                <div>الحالة</div>
                <div>الجهة</div>
                <div>الأولوية</div>
                <div>الإجراءات</div>
            </div>
        </div>
    );
}

export default ReportsTableHeader;
