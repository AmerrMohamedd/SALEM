function ReportsTableHeader() {
    return (
        <div
            className="
            mt-4
            bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
            text-white rounded-xl
            px-2 sm:px-4
            py-2 sm:py-3
            font-semibold
            text-[10px] sm:text-xs md:text-sm
        "
        >
            <div
                className="
                grid grid-cols-8
                text-center
                gap-1 sm:gap-2
            "
            >
                <div className="truncate">رقم البلاغ</div>
                <div className="truncate">التصنيف</div>
                <div className="truncate">الموقع</div>
                <div className="truncate">التاريخ</div>
                <div className="truncate">الحالة</div>
                <div className="truncate">الجهة</div>
                <div className="truncate">الأولوية</div>
                <div className="truncate">الإجراءات</div>
            </div>
        </div>
    );
}

export default ReportsTableHeader;
