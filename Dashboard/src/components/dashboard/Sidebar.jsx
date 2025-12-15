import logo from "../../assets/logow.png";

function Sidebar() {
    return (
        <aside className="w-72 min-h-screen bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white flex flex-col">

            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-white/20">
                <img src={logo} alt="Salem" className="w-40 object-contain" />
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
                {[
                    "الصفحة الرئيسية",
                    "إدارة البلاغات",
                    "تتبع سير العمل",
                    "سجل الشوارع والصيانة",
                    "التقارير والإحصائيات",
                    "مركز الإشعارات",
                    "إدارة المستخدمين",
                    "الإعدادات",
                ].map((item, i) => (
                    <div
                        key={i}
                        className={`px-4 py-3 rounded-xl cursor-pointer
              ${i === 0 ? "bg-white text-[#00816F] font-bold" : "hover:bg-white/10"}
            `}
                    >
                        {item}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
