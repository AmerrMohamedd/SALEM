import { useState } from "react";

import searchIcon from "../../assets/icons/search-icon.png";

function UsersFilters({
    onSearchChange,
    onRoleChange,
    onAddUser,
}) {
    const [search, setSearch] = useState("");
    const [focused, setFocused] = useState(false);


    return (
        <div className="flex items-center gap-3 mb-6 -mt-4">

            {/* Search */}
            <div
                className={`
                flex items-center gap-2
                bg-white px-3 py-1
                rounded-full
                shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                w-[860px]
                ${focused ? "ring-2 ring-[#2DDBC9]" : ""}
            `}
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
                    placeholder="البحث عن الموظفين بالاسم أو البريد الإلكتروني..."
                    className="w-full text-sm outline-none bg-transparent"
                />
            </div>

            {/* Role */}
            <select
                onChange={(e) => onRoleChange(e.target.value)}
                className="
                h-7 w-40
                px-3 text-sm
                border border-gray-200
                rounded-full
                shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]
            "
            >
                <option value="">الوظيفة</option>
                <option value="المديرون">المديرون</option>
                <option value="الموظفون">الموظفون</option>
                <option value="الميدانيون">الميدانيون</option>
                <option value="مسؤولو التوزيع">مسؤولو التوزيع</option>
            </select>

            {/* Add User */}
            <button
                onClick={onAddUser}
                className=" h-10 px-3   rounded        flex items-center gap-2      text-xs font-semibold
                text-white
                bg-gradient-to-t from-[#00816F] to-[#2DDBC9]
            "
            >
                إضافة موظف جديد
            </button>

        </div>
    );
}

export default UsersFilters;
