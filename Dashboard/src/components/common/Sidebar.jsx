import { NavLink } from "react-router-dom";

import logo from "../../assets/logow.png";

import homeIcon from "../../assets/icons/Home-w.png";
import homeIconActive from "../../assets/icons/Home-icon.png";

import reportsIcon from "../../assets/icons/Report-w.png";
import reportsIconActive from "../../assets/icons/Report-icon.png";

import bookingIcon from "../../assets/icons/Booking-w.png";
import bookingIconActive from "../../assets/icons/Booking-icon.png";

import reviewsIcon from "../../assets/icons/Reviews-w.png";
import reviewsIconActive from "../../assets/icons/Reviews-icon.png";

import notificationIcon from "../../assets/icons/Notification-w.png";
import notificationIconActive from "../../assets/icons/Notification-icon.png";

import usersIcon from "../../assets/icons/Users-w.png";
import usersIconActive from "../../assets/icons/Users-icon.png";

import settingsIcon from "../../assets/icons/Settings-w.png";
import settingsIconActive from "../../assets/icons/Settings-icon.png";

const menuItems = [
    {
        label: "الصفحة الرئيسية",
        path: "/dashboard",
        icon: homeIcon,
        iconActive: homeIconActive,
    },
    {
        label: "إدارة البلاغات",
        path: "/dashboard/reports",
        icon: reportsIcon,
        iconActive: reportsIconActive,
    },
    {
        label: "تتبع سير العمل",
        path: "/dashboard/workflow",
        icon: reportsIcon,
        iconActive: reportsIconActive,
    },
    {
        label: "سجل الشوارع والصيانة السابقة",
        path: "/dashboard/streets-history",
        icon: bookingIcon,
        iconActive: bookingIconActive,
    },
    {
        label: "التقارير والإحصائيات",
        path: "/dashboard/statistics",
        icon: reviewsIcon,
        iconActive: reviewsIconActive,
    },
    {
        label: "مركز الإشعارات",
        path: "/dashboard/notifications",
        icon: notificationIcon,
        iconActive: notificationIconActive,
    },
    {
        label: "إدارة المستخدمين",
        path: "/dashboard/users",
        icon: usersIcon,
        iconActive: usersIconActive,
    },
    {
        label: "الإعدادات",
        path: "/dashboard/settings",
        icon: settingsIcon,
        iconActive: settingsIconActive,
    },
];

function Sidebar() {
    return (
        <aside
            dir="rtl"
            className="w-[288px] min-w-[288px] max-w-[288px] min-h-screen bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
            text-white flex flex-col flex-shrink-0">
            {/* Logo */}
            <div className="flex justify-center items-center px-6 py-10 border-b border-white/20">
                <img src={logo} alt="Salem Logo" className="w-60 h-auto object-contain" />
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
                {menuItems.map((item, i) =>
                    item.path ? (
                        <NavLink key={i} to={item.path} end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                            ? "bg-white text-[#00816F] font-bold"
                            : "hover:bg-white/10 text-white"}`}>
                            {({ isActive }) => (
                                <>
                                    <img src={isActive ? item.iconActive : item.icon}
                                    className="w-5 h-5"/>
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                        ) : (
                        <div key={i}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/10 text-white">
                            <img src={item.icon} className="w-5 h-5 object-contain" />
                            <span>{item.label}</span>
                        </div>
                    )
                )}
            </nav>
        </aside>
    );
}

export default Sidebar;
