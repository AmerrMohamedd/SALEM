import { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../assets/icons/calendar.png";

function HomeFilters() {
    const [date, setDate] = useState(null);
    const { t, i18n } = useTranslation();

    const isArabic = i18n.language === "ar";
    const isRTL = !isArabic; // لأنك عاملة الاتجاه معكوس

    return (
        <div
            dir={isArabic ? "ltr" : "rtl"}
            className="-mt-3 flex justify-start relative">
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText={t("calendar")}
                className={`h-7 w-30 text-sm text-gray-900 border border-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer ${isArabic ? "text-right pr-8" : "text-left pl-8"}`}
            />

            <img
                src={calendarIcon}
                alt="calendar"
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isRTL ? "right-3" : "left-3"}`}
            />
        </div>
    );
}

export default HomeFilters;
