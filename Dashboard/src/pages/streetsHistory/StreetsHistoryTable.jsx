function StreetsHistoryTable() {
    return (
        <div
            className="mt-4 bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
           text-white rounded-xl px-4 py-3 text-sm font-semibold">
            <div className="grid grid-cols-6 text-center">
                <div>رقم البلاغ (ID)</div>
                <div>التاريخ والوقت</div>
                <div>نوع المشكلة</div>
                <div>الحالةالنهائيه</div>
                <div>زمن الاصلاح</div>
                <div>الإجراءات</div>
            </div>
        </div>
    );
}

export default StreetsHistoryTable;
