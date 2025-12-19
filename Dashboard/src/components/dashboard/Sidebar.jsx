import logo from "../../assets/logow.png";
import homeIcon from "../../assets/icons/Home-icon.png";
import reportsIcon from "../../assets/icons/report-icon.png";
import bookingIcon from "../../assets/icons/Booking-icon.png";
import reviewsIcon from "../../assets/icons/Reviews-icon.png";
import notificationIcon from "../../assets/icons/Notification-icon.png";
import usersIcon from "../../assets/icons/Users-icon.png";
import settingsIcon from "../../assets/icons/settings-icon.png";

const menuItems = [
    { label: "الصفحة الرئيسية", icon: homeIcon },
    { label: "إدارة البلاغات", icon: reportsIcon },
    { label: "تتبع سير العمل", icon: reportsIcon },
    { label: "سجل الشوارع والصيانة السابقة", icon: bookingIcon },
    { label: "التقارير والإحصائيات", icon: reviewsIcon },
    { label: "مركز الإشعارات", icon: notificationIcon },
    { label: "إدارة المستخدمين", icon: usersIcon },
    { label: "الإعدادات", icon: settingsIcon },
];

function Sidebar() {
    return (
        <aside
            dir="rtl"
            className="w-72 min-h-screen bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white flex flex-col">
            {/* Logo */}
            <div className="flex justify-center items-center px-6 py-10 border-b border-white/20">
                <img src={logo} alt="Salem Logo"
                className="w-60 h-auto object-contain"/>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                        ${i === 0 ? "bg-white text-[#00816F] font-bold" : "hover:bg-white/10"}`}>

                        {/* Icon */}
                        <img src={item.icon} alt=""
                        className="w-5 h-5 object-contain"/>

                        {/* Text */}
                        <span className="text-right">
                            {item.label}
                        </span>
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
