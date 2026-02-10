import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import searchIcon from "../../assets/icons/search-icon.png";
import calendarIcon from "../../assets/icons/calendar.png";

function StreetsHistoryFilters({
    onSearchChange,
    onDateChange,
    onCategoryChange,
}) {
    const [date, setDate] = useState(null);
    const [search, setSearch] = useState("");
    const [focused, setFocused] = useState(false);

    return (
        <div className="flex items-center gap-3 mb-6">

            {/* Search */}
            <div
                className={`flex items-center gap-2 bg-white px-3 py-1 rounded-full
                shadow-[0_2px_4px_rgba(0,0,0,0.12)] w-[860px]
                ${focused ? "ring-2 ring-[#2DDBC9]" : ""}`}
            >
                <img src={searchIcon} alt="search" className="w-4 h-4" />

                <input
                    type="text"
                    value={search}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        onSearchChange(e.target.value);
                    }}
                    placeholder="البحث عن سجل الشوارع والصيانات السابقة برقم البلاغ..."
                    className="w-full text-sm outline-none bg-transparent"
                />
            </div>

            {/* Date */}
            <div dir="ltr" className="relative">
                <DatePicker
                    selected={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                        onDateChange(newDate);
                    }}
                    placeholderText="التاريخ"
                    className="h-7 w-40 px-3 text-sm text-right border border-gray-200 rounded-full
                    shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                    focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer"
                />

                <img
                    src={calendarIcon}
                    alt="calendar"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
            </div>

            {/* Category */}
            <select
                onChange={(e) => onCategoryChange(e.target.value)}
                className="h-7 w-40 px-3 text-sm border border-gray-200 rounded-full
                shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
            >
                <option value="">نوع المشكلة</option>
                <option value="حفرة طريق">حفرة طريق</option>
                <option value="كسر ماسورة مياه">كسر ماسورة مياه</option>
                <option value="انقطاع إنارة">انقطاع إنارة</option>
                <option value="تلف رصيف">تلف رصيف</option>
            </select>

        </div>
    );
}

export default StreetsHistoryFilters;
