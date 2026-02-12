import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ar: {
        translation: {

            // Sidebar 
            home: "الصفحة الرئيسية",
            reports: "إدارة البلاغات",
            workflow: "تتبع سير العمل",
            streets: "سجل الشوارع والصيانة السابقة",
            statistics: "التقارير والإحصائيات",
            notifications: "مركز الإشعارات",
            users: "إدارة المستخدمين",
            settings: "الإعدادات",

            // Header
            logout: "تسجيل الخروج",
            dashboard: "لوحة التحكم",

            // Home
            homeTitle: "البلاغات الأسبوعية",
            calendar: "التقويم",
            quickNotifications: "🔔 إشعارات سريعة",

            solvedToday: "البلاغات التي تم حلها اليوم",
            transferred: "البلاغات المحولة",
            inReview: "البلاغات قيد المراجعة",
            openReports: "البلاغات المفتوحة",
            totalReports: "إجمالي البلاغات",

            reportId: "رقم البلاغ (ID)",
            date: "التاريخ",
            status: "الحالة",
            entity: "الجهة",

            inProgress: "قيد التنفيذ",
            underReview: "تحت المراجعة",
            solved: "تم الحل",

            roads: "الطرق",
            electricity: "الكهرباء",
            water: "المياه",
            lighting: "الإنارة",

            jan: "يناير",
            feb: "فبراير",
            mar: "مارس",
            apr: "أبريل",
            may: "مايو",
            jun: "يونيو",
            jul: "يوليو",
            aug: "أغسطس",
            sep: "سبتمبر",
            oct: "أكتوبر",
            nov: "نوفمبر",
            dec: "ديسمبر",

            sat: "السبت",
            sun: "الأحد",
            mon: "الإثنين",
            tue: "الثلاثاء",
            wed: "الأربعاء",
            thu: "الخميس",
            fri: "الجمعة",

            notif1: "من المتوقع زيادة معدل الحوادث خلال الساعتين القادمتين",
            notif2: "متوسط زمن الاستجابة لفريق الإسعاف ارتفع +12 دقيقة اليوم",
            notif3: "تم تسجيل بلاغ حريق جديد في مدينة نصر",



        }
    },
    en: {
        translation: {

            // Sidebar 
            home: "Home",
            reports: "Reports",
            workflow: "Workflow Tracking",
            streets: "Streets History",
            statistics: "Statistics",
            notifications: "Notifications",
            users: "Users Management",
            settings: "Settings",

            // Header
            logout: "Logout",
            dashboard: "Dashboard",

            // Home
            homeTitle: "Weekly Reports",
            calendar: "Calendar",
            quickNotifications: "🔔 Quick Notifications",

            solvedToday: "Reports Solved Today",
            transferred: "Transferred Reports",
            inReview: "Reports Under Review",
            openReports: "Open Reports",
            totalReports: "Total Reports",

            reportId: "Report ID",
            date: "Date",
            status: "Status",
            entity: "Entity",

            inProgress: "In Progress",
            underReview: "Under Review",
            solved: "Solved",

            roads: "Roads",
            electricity: "Electricity",
            water: "Water",
            lighting: "Lighting",

            jan: "January",
            feb: "February",
            mar: "March",
            apr: "April",
            may: "May",
            jun: "June",
            jul: "July",
            aug: "August",
            sep: "September",
            oct: "October",
            nov: "November",
            dec: "December",

            sat: "Sat",
            sun: "Sun",
            mon: "Mon",
            tue: "Tue",
            wed: "Wed",
            thu: "Thu",
            fri: "Fri",

            notif1: "Accident rate is expected to increase in the next two hours",
            notif2: "Average ambulance response time increased by +12 minutes today",
            notif3: "A new fire report has been registered in Nasr City",



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
