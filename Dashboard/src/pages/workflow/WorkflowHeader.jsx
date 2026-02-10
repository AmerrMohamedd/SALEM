function WorkflowHeader() {
    const items = [
        { title: "بلاغات جديدة", count: 3, color: "red" },
        { title: "تم التعيين", count: 0, color: "blue" },
        { title: "جاري التنفيذ", count: 3, color: "yellow" },
        { title: "مراجعة", count: 0, color: "purple" },
        { title: "تم الانتهاء", count: 1, color: "green" },
    ];

    const colorMap = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        yellow: "bg-yellow-400",
        purple: "bg-purple-500",
        green: "bg-green-500",
    };

    return (
        <div
            dir="rtl"
            className="
            bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
            rounded-xl text-white
            px-2 sm:px-4 md:px-6
            py-3
        "
        >
            <div
                className="
                grid grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-5
                gap-2 sm:gap-4
            "
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="
                        flex items-center justify-center gap-1 sm:gap-2
                        text-[10px] sm:text-xs md:text-sm
                        font-semibold
                        whitespace-nowrap
                    "
                    >
                        {/* الكورة */}
                        <span
                            className={`
                            w-2.5 h-2.5 sm:w-3 sm:h-3
                            rounded-full
                            ${colorMap[item.color]}
                        `}
                        />

                        {/* الاسم */}
                        <span className="truncate max-w-[90px] sm:max-w-none">
                            {item.title}
                        </span>

                        {/* الرقم */}
                        <span>({item.count})</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkflowHeader;
