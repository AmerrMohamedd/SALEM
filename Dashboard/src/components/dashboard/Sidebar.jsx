import logo from "../../assets/logow.png";

function Sidebar() {
    return (
        <aside className="w-64 bg-gradient-to-b from-[#00816F] to-[#2DDBC9] text-white flex flex-col">

            <div className="p-6 flex items-center gap-2 font-bold text-xl">
                <img src={logo} alt="Salem" className="w-8" />
                SALEM
            </div>

            <nav className="flex-1 px-4 space-y-2 text-sm">
                <div className="p-2 rounded-lg bg-white/20">
                    الصفحة الرئيسية
                </div>
                <div className="p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    إدارة البلاغات
                </div>
                <div className="p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    التقارير
                </div>
                <div className="p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    الإعدادات
                </div>
            </nav>

        </aside>
    );
}

export default Sidebar;
