import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ar: {
        translation: {
            home: "الصفحة الرئيسية",
            reports: "إدارة البلاغات",
            workflow: "تتبع سير العمل",
            streets: "سجل الشوارع والصيانة السابقة",
            statistics: "التقارير والإحصائيات",
            notifications: "مركز الإشعارات",
            users: "إدارة المستخدمين",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            dashboard: "لوحة التحكم"
        }
    },
    en: {
        translation: {
            home: "Home",
            reports: "Reports",
            workflow: "Workflow Tracking",
            streets: "Streets History",
            statistics: "Statistics",
            notifications: "Notifications",
            users: "Users Management",
            settings: "Settings",
            logout: "Logout",
            dashboard: "Dashboard"
        }
    }
};

const savedLang = localStorage.getItem("lang") || "ar";

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLang,
        fallbackLng: "ar",
        interpolation: {
            escapeValue: false
        }
    });

// ✅ ضبط الاتجاه أول ما المشروع يفتح
document.documentElement.dir = savedLang === "en" ? "ltr" : "rtl";
document.documentElement.lang = savedLang;

export default i18n;
