import { useState } from "react";
import searchIcon from "../../assets/icons/search-icon.png";
import filterIcon from "../../assets/icons/filter-icon.png";

function NotificationsFilters({ onSearchChange }) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="-mt-6 -mr-6 flex items-center gap-2 relative">
            {/* Search by name */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="ابحث بالاسم..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="
                    h-7 w-48 pr-10 pl-3
                    text-sm text-right
                    border border-gray-200 rounded-full
                    shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                    focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]
                "
                />
                <img
                    src={searchIcon}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                />
            </div>

            {/* Filter button (لو حابة تزودي بعدين) */}
            {/* Filter Button */}
            <button onClick={() => setShowFilters(!showFilters)}
                className="h-7 w-7 flex items-center justify-center rounded-full
                bg-[#2DDBC9] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                <img src={filterIcon} alt="filter" className="w-4 h-4" />
            </button>

            {/*  Filters */}
            {showFilters && (
                <div className="flex items-center gap-2">
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
                            shadow-[0_2px_4px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer"/>
                        <img src={calendarIcon} alt="calendar"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                    </div>

                    {/*  Entity */}
                    <select
                        onChange={(e) => onEntityChange(e.target.value)}
                        className="h-7 w-40 px-3 text-sm border border-gray-200 rounded-full
                        shadow-[0_2px_4px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                        <option value="">الجهة المسؤولة</option>
                        <option value="هيئة الطرق">هيئة الطرق</option>
                        <option value="شركة المياه">شركة المياه</option>
                        <option value="الكهرباء">شركة الكهرباء</option>
                        <option value="الانارة">الانارة</option>
                    </select>

                    {/*  Status */}
                    <select
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="h-7 w-40 px-3 text-sm border border-gray-200 rounded-full
                        shadow-[0_2px_4px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                        <option value="">الحالة</option>
                        <option value="قيد التنفيذ">قيد التنفيذ</option>
                        <option value="تم الحل">تم الحل</option>
                        <option value="مرفوض">مرفوض</option>
                    </select>
                </div>
            )}
        </div>
    );
}

export default NotificationsFilters;
