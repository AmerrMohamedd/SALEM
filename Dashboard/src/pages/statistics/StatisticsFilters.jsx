import { useState } from "react";
import { useTranslation } from "react-i18next";

function StatisticsFilters({ onChange }) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const [period, setPeriod] = useState("month");

    function handleChange(value) {
        setPeriod(value);
        onChange?.({ period: value });
    }

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex items-center gap-3 mb-3 -mt-3">
            <button
                onClick={() => handleChange("month")}
                className={`h-7 px-4 text-sm rounded-full border shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                transition ${period === "month"
                        ? "bg-[#00816F] text-white border-[#00816F]"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}>
                {t("thisMonth")}
            </button>

            <button
                onClick={() => handleChange("last7days")}
                className={`h-7 px-4 text-sm rounded-full border shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                transition ${period === "last7days"
                        ? "bg-[#00816F] text-white border-[#00816F]"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}>
                {t("last7Days")}
            </button>
        </div>
    );
}

export default StatisticsFilters;
