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
            
        </div>
    );
}

export default StatisticsFilters;
