function NotificationsTableHeader() {
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
            <div className="grid grid-cols-5 text-center gap-1 sm:gap-2">
                <div className="text-right pr-6">الاسم</div>
                <div>البريد الالكتروني</div>
                <div>الموضوع</div>
                <div>الرساله</div>
                <div>الاجراءات</div>
            </div>
        </div>
    );
}

export default NotificationsTableHeader;
