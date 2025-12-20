import { NavLink } from "react-router-dom";

import logo from "../../assets/logow.png";

import homeIcon from "../../assets/icons/Home-icon.png";
import homeIconW from "../../assets/icons/Home-w.png";

import reportsIcon from "../../assets/icons/Report-icon.png";
import reportsIconW from "../../assets/icons/Report-w.png";

import bookingIcon from "../../assets/icons/Booking-icon.png";
import bookingIconW from "../../assets/icons/Booking-w.png";

import reviewsIcon from "../../assets/icons/Reviews-icon.png";
import reviewsIconW from "../../assets/icons/Reviews-w.png";

import notificationIcon from "../../assets/icons/Notification-icon.png";
import notificationIconW from "../../assets/icons/Notification-w.png";

import usersIcon from "../../assets/icons/Users-icon.png";
import usersIconW from "../../assets/icons/Users-w.png";

import settingsIcon from "../../assets/icons/Settings-icon.png";
import settingsIconW from "../../assets/icons/Settings-w.png";

const menuItems = [
    {
        label: "الصفحة الرئيسية",
        path: "/dashboard",
        icon: homeIcon,
        iconActive: homeIconW,
    },
    {
        label: "إدارة البلاغات",
        path: "/dashboard/reports",
        icon: reportsIcon,
        iconActive: reportsIconW,
    },
    {
        label: "تتبع سير العمل",
        icon: reportsIcon,
        iconActive: reportsIconW,
    },
    {
        label: "سجل الشوارع والصيانة السابقة",
        icon: bookingIcon,
        iconActive: bookingIconW,
    },
    {
        label: "التقارير والإحصائيات",
        icon: reviewsIcon,
        iconActive: reviewsIconW,
    },
    {
        label: "مركز الإشعارات",
        icon: notificationIcon,
        iconActive: notificationIconW,
    },
    {
        label: "إدارة المستخدمين",
        icon: usersIcon,
        iconActive: usersIconW,
    },
    {
        label: "الإعدادات",
        icon: settingsIcon,
        iconActive: settingsIconW,
    },
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
                {menuItems.map((item, i) =>
                    item.path ? (
                        <NavLink
                            key={i}
                            to={item.path}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
          ${isActive
                                    ? "bg-white text-[#00816F] font-bold"
                                    : "hover:bg-white/10 text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <><img
                                    src={isActive ? item.icon : item.iconActive}
                                    className="w-5 h-5 object-contain"
                                />

                                    <span className="text-right">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ) : (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/10 text-white"
                        >
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
