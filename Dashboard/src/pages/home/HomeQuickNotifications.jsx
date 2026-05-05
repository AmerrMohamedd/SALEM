import { useTranslation } from "react-i18next";

function HomeQuickNotifications({ notifications = [] }) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const getColor = (percent) => {
        if (percent < 25) return "bg-red-500";
        if (percent < 50) return "bg-orange-400";
        if (percent < 75) return "bg-blue-600";
        return "bg-green-600";
    };

    return (
        <div dir={isArabic ? "rtl" : "ltr"}>
           

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {notifications.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <p className="text-xs text-gray-600 flex-1">
                                {t(item.text)}
                            </p>

                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                                ${item.percent === 100
                                    ? "bg-green-600 border-green-600"
                                    : "border-gray-400"}`}>
                                {item.percent === 100 && (
                                    <svg
                                        width="10"
                                        height="8"
                                        viewBox="0 0 12 9"
                                        fill="none">
                                        <path
                                            d="M1 4.5L4.5 8L11 1"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div  className={`h-full ${getColor(item.percent)}`}
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

export default HomeQuickNotifications;
