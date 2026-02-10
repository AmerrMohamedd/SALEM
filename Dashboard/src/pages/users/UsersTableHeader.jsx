function UsersTableHeader() {
    return (
        <div
            className="
                mt-4
                bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
                text-white
                rounded-xl
                px-4 py-3
                text-sm font-semibold
            "
        >
            <div className="grid grid-cols-6 items-center text-center">
                <div>الاسم</div>
                <div>البريد</div>
                <div>الصلاحية / الدور</div>
                <div>الحالة</div>
                <div>آخر دخول</div>
                <div>الإجراءات</div>
            </div>
        </div>
    );
}

export default UsersTableHeader;
