import { useState } from "react";

const initialNotifications = [
    {
        text: "من المتوقع زيادة معدل الحوادث خلال الساعتين القادمتين",
        percent: 15,
        active: false,
    },
    {
        text: "متوسط زمن الاستجابة لفريق الإسعاف ارتفع +12 دقيقة اليوم",
        percent: 45,
        active: false,
    },
    {
        text: "تم تسجيل بلاغ حريق جديد في مدينة نصر",
        percent: 100,
        active: false,
    },
];

const getColor = (percent) => {
    if (percent < 25) return "bg-red-500 border-red-500";
    if (percent < 50) return "bg-orange-400 border-orange-400";
    if (percent < 75) return "bg-blue-600 border-blue-600";
    return "bg-green-600 border-green-600";
};

function QuickNotifications() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleClick = (index) => {
        setNotifications((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        active: true,
                        percent: Math.min(item.percent + 5, 100),
                    }
                    : item
            )
        );
    };

    return (
        <div dir="rtl">
            <h3 className="text-sm font-bold mb-3 text-right">
                🔔 إشعارات سريعة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notifications.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-right">

                        {/* السطر الصح */}
                        <div className="flex items-center gap-2 mb-3">

                            {/* الكلام الأول */}
                            <p className="text-xs text-gray-600 flex-1">
                                {item.text}
                            </p>

                            <button disabled
                            className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${item.percent === 100
                            ? "bg-green-600 border-green-600" : "bg-transparent border-gray-400"} cursor-default flex-shrink-0`}>
                                {item.percent === 100 && (
                                    <svg
                                        width="10"
                                        height="8"
                                        viewBox="0 0 12 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 4.5L4.5 8L11 1"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* progress */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full ${getColor(item.percent).split(" ")[0]}`}
                                style={{ width: `${item.percent}%` }}/>
                            </div>

                            <span className="text-xs font-bold">
                                {item.percent}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuickNotifications;
