import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import searchIcon from "../../assets/icons/search-icon.png";
import calendarIcon from "../../assets/icons/calendar.png";


function StreetsHistoryFilters() {
    const [date, setDate] = useState("");
    const [department, setDepartment] = useState("");
    const [search, setSearch] = useState("");

        return (
            <div className="flex items-center gap-3 mb-6">

                {/* Search */}
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.12)] w-[860px]
                focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer">
                    <img src={searchIcon} alt="search" className="w-4 h-4" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="البحث عن سجل الشوارع والصيانات السابقة بأسم الشارع..."
                    className="w-full text-sm outline-none bg-transparent"/>
                </div>

                {/* Date Picker (نفس الشكل اللي بعتيه) */}
                <div dir="ltr" className="relative">
                    <DatePicker
                        selected={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                        }}
                        placeholderText="التاريخ"
                        className="h-7 w-40 px-3 text-sm text-right border border-gray-200 rounded-full
                        shadow-[0_2px_4px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer"
                    />

                    <img src={calendarIcon} alt="calendar"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"/>
                </div>

                {/* الجهة المسؤولة */}
                <select
                    onChange={(e) => onEntityChange(e.target.value)}
                    className="h-7 w-40 px-3 text-sm border border-gray-200 rounded-full
                    shadow-[0_2px_4px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                    <option value="">نوع المشكلة  </option>
                    <option value="هيئة الطرق">هيئة الطرق</option>
                    <option value="شركة المياه">شركة المياه</option>
                    <option value="الكهرباء">شركة الكهرباء</option>
                    <option value="الانارة">الانارة</option>
                </select>

            </div>
        );
    }

    export default StreetsHistoryFilters;
