import { useState } from "react";
import searchIcon from "../../assets/icons/search-icon.png";
import filterIcon from "../../assets/icons/filter-icon.png";

function NotificationsFilters({ onSearchChange }) {
    const [showFilters, setShowFilters] = useState(false);
    const [entity, setEntity] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div className="-mt-6 -mr-6 flex items-center gap-2 relative">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="ابحث بالاسم..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className=" h-7 w-48 pr-10 pl-3 text-sm text-right
                    border border-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                    focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] "/>
                <img src={searchIcon}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"/>
            </div>

            {/* Filter button */}
            <button
                type="button"
                onClick={() => setShowFilters((p) => !p)}
                className="  h-7 w-7 flex items-center justify-center
                rounded-full bg-[#2DDBC9] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                <img src={filterIcon} className="w-4 h-4" />
            </button>

            {/* Filters */}
            {showFilters && (
                <div className="flex items-center gap-2">

                    {/* Entity */}
                    <select
                        value={entity}
                        onChange={(e) => setEntity(e.target.value)}
                        className="h-7 w-40 px-3 text-sm border border-gray-200 rounded-full
                        shadow-[0_2px_4px_rgba(0,0,0,0.12)]focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                        <option value=""> النوع</option>
                        <option value="هيئة الطرق"> عاجلة</option>
                        <option value="شركة المياه">غير عاجلة </option>
                       
                    </select>

                    {/* Status */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="
                            h-7 w-32 px-3 text-sm
                            border border-gray-200 rounded-full
                            shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                            focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] ">
                        <option value="">الحالة</option>
                        <option value="قيد التنفيذ">مقروء </option>
                        <option value="تم الحل">غير مقروء </option>
                    </select>
                </div>
            )}
        </div>
    );
}

export default NotificationsFilters;
