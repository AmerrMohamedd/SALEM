import { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import searchIcon from "../../assets/icons/search-icon.png";
import calendarIcon from "../../assets/icons/calendar.png";

function StreetsHistoryFilters({
    onSearchChange,
    onDateChange,
    onCategoryChange,
}) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const [date, setDate] = useState(null);
    const [search, setSearch] = useState("");
    const [focused, setFocused] = useState(false);

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex items-center gap-3 mb-6">

            {/*  Search */}
            <div
                className={`flex items-center gap-2 bg-white px-3 py-1 rounded-full
                shadow-[0_2px_4px_rgba(0,0,0,0.12)] w-[860px] ${focused ? "ring-2 ring-[#2DDBC9]" : ""}`}>
                <img
                    src={searchIcon}
                    alt="search"
                    className="w-4 h-4"
                />

                <input
                    type="text"
                    value={search}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        onSearchChange(e.target.value);
                    }}
                    placeholder={t("searchStreetHistory")}
                    className={`w-full text-sm outline-none bg-transparent ${isArabic ? "text-right" : "text-left"}`}/>
            </div>

            {/*  Date */}
            <div className="relative">
                <DatePicker
                    selected={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                        onDateChange(newDate);
                    }}
                    placeholderText={t("dateFilter")}
                    className={`h-7 w-40 text-sm text-gray-900 border border-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                    focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer ${isArabic ? "text-right pr-8" : "text-left pl-8"}`}/>
                     
                <img
                    src={calendarIcon}
                    alt="calendar"
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 end-3"
                />
            </div>


            {/*  Category */}
            <select
                onChange={(e) => onCategoryChange(e.target.value)}
                className={`h-7 w-40 px-3 text-sm border border-gray-200 rounded-full
                shadow-[0_2px_4px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]
                ${isArabic ? "text-right" : "text-left"}`}>
                <option value="">{t("problemType")}</option>
                <option value="حفرة طريق">
                    {isArabic ? "حفرة طريق" : "Road Hole"}
                </option>
                <option value="كسر ماسورة مياه">
                    {isArabic ? "كسر ماسورة مياه" : "Water Pipe Break"}
                </option>
                <option value="انقطاع إنارة">
                    {isArabic ? "انقطاع إنارة" : "Lighting Outage"}
                </option>
                <option value="تلف رصيف">
                    {isArabic ? "تلف رصيف" : "Sidewalk Damage"}
                </option>
            </select>

        </div>
    );
}

export default StreetsHistoryFilters;
