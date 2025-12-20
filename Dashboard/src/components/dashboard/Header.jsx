import { useLocation } from "react-router-dom";
import langIcon from "../../assets/icons/Language-icon.png";
import logoutIcon from "../../assets/icons/LogOut-icon.png";

const pageTitles = {
    "/dashboard": "الصفحة الرئيسية",
    "/dashboard/reports": "إدارة البلاغات",
    "/dashboard/workflow": "تتبع سير العمل",
    "/dashboard/history": "سجل الشوارع والصيانة السابقة",
    "/dashboard/stats": "التقارير والإحصائيات",
    "/dashboard/notifications": "مركز الإشعارات",
    "/dashboard/users": "إدارة المستخدمين",
    "/dashboard/settings": "الإعدادات",
};

function Header({ onLogout }) {
    const location = useLocation();

    const title =
        pageTitles[location.pathname] || "لوحة التحكم";

    return (
        <header
            dir="rtl"
            className="h-16 bg-white border-b flex items-center justify-between px-6"
        >
            {/* ✅ Dynamic Title */}
            <h2 className="font-extrabold text-gray-800">
                {title}
            </h2>

            {/* Actions */}
            <div className="flex items-center gap-6 text-sm">
                {/* Language */}
                <button
                    dir="ltr"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                    <img src={langIcon} alt="language" className="w-4 h-4" />
                    EN
                </button>

                {/* Logout */}
                <button
                    dir="ltr"
                    onClick={onLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-red-500 font-semibold hover:text-red-600 transition"
                >
                    <img src={logoutIcon} alt="logout" className="w-4 h-4" />
                    تسجيل الخروج
                </button>
            </div>
        </header>
    );
}

export default Header;
