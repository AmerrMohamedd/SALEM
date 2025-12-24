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
            className="grid grid-cols-5 bg-gradient-to-r from-[#00816F] to-[#2DDBC9] rounded-xl text-white px-6 py-2">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center gap-2 font-semibold">
                    {/* الكورة */}
                    <span className={`w-3 h-3 rounded-full ${colorMap[item.color]}`}/>

                    {/* الاسم */}
                    <span>{item.title}</span>

                    {/* الرقم */}
                    <span>({item.count})</span>
                </div>
            ))}
        </div>
    );
}

export default WorkflowHeader;
