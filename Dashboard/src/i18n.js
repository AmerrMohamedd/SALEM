import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ar: {
        translation: {
            /* ================= Sidebar ================= */
            home: "الصفحة الرئيسية",
            reports: "إدارة البلاغات",
            workflow: "تتبع سير العمل",
            streets: "سجل الشوارع",
            statistics: "الإحصائيات",
            notifications: "الإشعارات",
            users: "المستخدمين",
            settings: "الإعدادات",

            /* ================= Header ================= */
            logout: "تسجيل الخروج",
            dashboard: "لوحة التحكم",

            /* ================= Home ================= */
            homeTitle: "البلاغات الأسبوعية",
            calendar: "التقويم",
            quickNotifications: "🔔 إشعارات سريعة",

            solvedToday: "البلاغات التي تم حلها اليوم",
            transferred: "البلاغات المحولة",
            inReview: "قيد المراجعة",
            openReports: "البلاغات المفتوحة",
            totalReports: "إجمالي البلاغات",

            /* ================= Repots ================= */
            reportId: "رقم البلاغ",
            reportNumber: "رقم البلاغ",
            category: "التصنيف",
            location: "الموقع",
            date: "التاريخ",
            reportDate: "التاريخ",
            status: "الحالة",
            entity: "الجهة",
            priority: "الأولوية",
            actions: "الإجراءات",

            /* ================= Status ================= */
            inProgress: "قيد التنفيذ",
            underReview: "تحت المراجعة",
            solved: "تم الحل",
            rejected: "مرفوض",

            /* ================= Priority ================= */
            high: "عالية",
            medium: "متوسطة",
            low: "منخفضة",

            /* ================= Entities ================= */
            roads: "الطرق",
            water: "المياه",
            electricity: "الكهرباء",
            lighting: "الإنارة",

            /* ================= Months ================= */
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

            /* ================= Days ================= */
            sat: "السبت",
            sun: "الأحد",
            mon: "الإثنين",
            tue: "الثلاثاء",
            wed: "الأربعاء",
            thu: "الخميس",
            fri: "الجمعة",

            /* ================= Notifications ================= */
            notif1: "من المتوقع زيادة معدل الحوادث خلال الساعتين القادمتين",
            notif2: "متوسط زمن الاستجابة لفريق الإسعاف ارتفع +12 دقيقة اليوم",
            notif3: "تم تسجيل بلاغ جديد",

            /* ================= Reports Page ================= */
            noReports: "لا توجد بلاغات حاليًا",
            noReportsDesc: "عند وصول بلاغات جديدة ستظهر هنا تلقائيًا",

            searchById: "ابحث برقم البلاغ...",
            dateFilter: "التاريخ",
            entityFilter: "الجهة المسؤولة",
            statusFilter: "الحالة",

            previous: "السابق",
            next: "التالي",
            page: "صفحة",
            of: "من",

            /* ================= Details Page ================= */
            reportDetails: "تفاصيل البلاغ",
            rejectReport: "رفض البلاغ",
            assignToOther: "تعيين لإدارة أخرى",
            showOnMap: "عرض على الخريطة",
            back: "رجوع",
            mapTitle: "الخريطة",

            // ===== Mock Report Values (Temporary Until API) =====
            // Categories
            roadHole: "حفرة طريق",
            pipeBreak: "كسر ماسورة",
            lightingPole: "عمود إنارة",
            // Locations
            nasrCity: "مدينة نصر",
            maadi: "المعادي",
            abbasia: "العباسية",
            heliopolis: "مصر الجديدة",
            dokki: "الدقي",
            shobra: "شبرا",
            // Priority
            high: "عالية",
            medium: "متوسطة",
            low: "منخفضة",



            /* ================= Details Page ================= */
            reportDetails: "تفاصيل البلاغ",
            rejectReport: "رفض البلاغ",
            assignToOther: "تعيين لإدارة أخرى",
            showOnMap: "عرض على الخريطة",

            /* ================= Map Page ================= */
            mapTitle: "الخريطه",
            back: "رجوع",


            /* ================= Streets History ================= */
            streetsHistoryEmpty: "لا يوجد سجل الشوارع والصيانات السابقة حتى الآن",
            searchStreetHistory:"البحث عن سجل الشوارع والصيانات السابقة برقم البلاغ...",
            problemType: "نوع المشكلة",
            dateTime: "التاريخ والوقت",
            finalStatus: "الحالة النهائية",
            repairTime: "زمن الإصلاح",
            procedures: "الإجراءات",
            avgStatusTime: "متوسط زمن الحالة",
            mostFrequentProblem: "المشكلة الأكثر تكرارًا",
            totalReportsCount: "إجمالي البلاغات",
            before: "قبل",
            after: "بعد",
            aiInitialAnalysis:"نتيجة تحليل الذكاء الاصطناعي الأولية للمشكلة:",
            aiComparisonResult:"نتيجة مقارنة الذكاء الاصطناعي بين الصورتين:",
            reportNumberLabel: "رقم البلاغ",
            problemTypeLabel: "نوع المشكلة",
            registrationDate: "تاريخ التسجيل",
            responsibleEntity: "الجهة المسؤولة",
            mapTitleWithLocation: "الخريطة – {{location}}",

            /* ================= Filters ================= */
            dateFilter: "التاريخ",
            statusFilter: "الحالة",
            entityFilter: "الجهة المسؤولة",

            /* ================= Categories ================= */
            roadHole: "حفرة طريق",
            pipeBreak: "كسر ماسورة مياه",
            lightingPole: "انقطاع إنارة",
            sidewalkDamage: "تلف رصيف",

            /* ================= Status ================= */
            inProgress: "قيد التنفيذ",
            solved: "تم الحل",
            rejected: "مرفوض",

            /* =============== Mock data=============== */
            mock_avgTimeValue: "4 ساعات و50 دقيقة",
            mock_mostFrequentDesc:"80% من الإجمالي (2,004): مشاكل تسريب مياه",
            mock_aiInitial:"تصنيف مبدئي للمشكلة",
            mock_aiNoChange:"لا يوجد تغيير ملحوظ حتى الآن",
            threeDays: "3 أيام",
            twoDays: "يومان",
            oneDay: "يوم واحد",
            fourDays: "4 أيام",
            fiveDays: "5 أيام",
            noTime: "—",
            waterLeak: "تسريب مياه",
            groundSubsidence: "هبوط أرضي",
            trafficSignalFailure: "عطل إشارة مرور",
            lightingPoleDamage: "تلف أعمدة إنارة",
            sewageBlockage: "انسداد صرف صحي",
            asphaltCracks: "تشققات إسفلت",
            speedBumpDamage: "تلف مطبات",
            rainWaterAccumulation: "تجمع مياه أمطار",
            traffic: "المرور",

        }
    },

    en: {
        translation: {
            /* ================= Sidebar ================= */
            home: "Home",
            reports: "Reports",
            workflow: "Workflow Tracking",
            streets: "Streets History",
            statistics: "Statistics",
            notifications: "Notifications",
            users: "Users",
            settings: "Settings",

            /* ================= Header ================= */
            logout: "Logout",
            dashboard: "Dashboard",

            /* ================= Home ================= */
            homeTitle: "Weekly Reports",
            calendar: "Calendar",
            quickNotifications: "🔔 Quick Notifications",

            solvedToday: "Reports Solved Today",
            transferred: "Transferred Reports",
            inReview: "Under Review",
            openReports: "Open Reports",
            totalReports: "Total Reports",

            /* ================= Table General ================= */
            reportId: "Report ID",
            reportNumber: "Report ID",
            category: "Category",
            location: "Location",
            date: "Date",
            reportDate: "Date",
            status: "Status",
            entity: "Entity",
            priority: "Priority",
            actions: "Actions",

            /* ================= Status ================= */
            inProgress: "In Progress",
            underReview: "Under Review",
            solved: "Solved",
            rejected: "Rejected",

            /* ================= Priority ================= */
            high: "High",
            medium: "Medium",
            low: "Low",

            /* ================= Entities ================= */
            roads: "Roads",
            water: "Water",
            electricity: "Electricity",
            lighting: "Lighting",

            /* ================= Months ================= */
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

            /* ================= Days ================= */
            sat: "Sat",
            sun: "Sun",
            mon: "Mon",
            tue: "Tue",
            wed: "Wed",
            thu: "Thu",
            fri: "Fri",

            /* ================= Notifications ================= */
            notif1: "Accident rate is expected to increase in the next two hours",
            notif2: "Average ambulance response time increased by 12 minutes today",
            notif3: "A new report has been registered",

            /* ================= Reports Page ================= */
            noReports: "No reports available",
            noReportsDesc: "New reports will appear here automatically",

            searchById: "Search by Report ID...",
            dateFilter: "Date",
            entityFilter: "Responsible Entity",
            statusFilter: "Status",

            previous: "Previous",
            next: "Next",
            page: "Page",
            of: "of",

            // ===== Mock Report Values (Temporary Until API) =====

            // Categories
            roadHole: "Road Hole",
            pipeBreak: "Pipe Break",
            lightingPole: "Lighting Pole",

            // Locations
            nasrCity: "Nasr City",
            maadi: "Maadi",
            abbasia: "Abbasia",
            heliopolis: "Heliopolis",
            dokki: "Dokki",
            shobra: "Shobra",

            // Priority
            high: "High",
            medium: "Medium",
            low: "Low",

            /* ================= Details Page ================= */
            reportDetails: "Report Details",
            rejectReport: "Reject Report",
            assignToOther: "Assign to Another Department",
            showOnMap: "Show on Map",

            /* ================= Map Page ================= */
            mapTitle: "Map",
            back: "back",

            /* ================= Streets History Page ================= */
            streetsHistoryEmpty: "No streets and maintenance history available yet",

            searchStreetHistory: "Search streets and previous maintenance by Report ID...",
            problemType: "Problem Type",

            finalStatus: "Final Status",
            repairTime: "Repair Time",
            dateTime: "Date & Time",
            procedures: "Procedures",

            avgStatusTime: "Average Status Duration",
            mostFrequentProblem: "Most Frequent Problem",
            totalReportsCount: "Total Reports",

            before: "Before",
            after: "After",

            aiInitialAnalysis: "Initial AI Problem Analysis:",
            aiComparisonResult: "AI Comparison Result Between Images:",

            reportNumberLabel: "Report ID",
            problemTypeLabel: "Problem Type:",
            registrationDate: "Registration Date:",
            responsibleEntity: "Responsible Entity:",

            showOnMap: "Show on Map",
            mapTitleWithLocation: "Map – {{location}}",

            /* ================= MOCK DATA (FAKE DATA - FOR UI TESTING ONLY) ================= */

            // Categories
            mock_roadHole: "Road Hole",
            mock_waterPipeBreak: "Water Pipe Break",
            mock_lightingOutage: "Lighting Outage",
            mock_sidewalkDamage: "Sidewalk Damage",
            mock_waterLeak: "Water Leakage",
            mock_groundSubsidence: "Ground Subsidence",
            mock_trafficSignalFailure: "Traffic Signal Failure",
            mock_lightingPoleDamage: "Lighting Pole Damage",
            mock_sewageBlockage: "Sewage Blockage",
            mock_asphaltCracks: "Asphalt Cracks",
            mock_speedBumpDamage: "Speed Bump Damage",
            mock_rainWaterAccumulation: "Rainwater Accumulation",

            // Status
            mock_inProgress: "In Progress",
            mock_solved: "Solved",
            mock_rejected: "Rejected",

            // Entities
            mock_municipality: "Municipality",
            mock_waterDept: "Water Department",
            mock_electricityDept: "Electricity Department",
            mock_trafficDept: "Traffic Department",

            // Repair Time
            mock_3days: "3 Days",
            mock_2days: "2 Days",
            mock_1day: "1 Day",
            mock_4days: "4 Days",
            mock_5days: "5 Days",

            // AI Mock Text
            mock_aiInitial: "Preliminary classification of the issue",
            mock_aiNoChange: "No noticeable change detected yet",

            // Stats Mock
            mock_avgTimeValue: "4 Hours 50 Minutes",
            mock_mostFrequentDesc: "80% of total (2,004): Water Leakage Issues",
            threeDays: "3 Days",
            twoDays: "2 Days",
            oneDay: "1 Day",
            fourDays: "4 Days",
            fiveDays: "5 Days",
            noTime: "—",

            waterLeak: "Water Leak",
            groundSubsidence: "Ground Subsidence",
            trafficSignalFailure: "Traffic Signal Failure",
            lightingPoleDamage: "Lighting Pole Damage",
            sewageBlockage: "Sewage Blockage",
            asphaltCracks: "Asphalt Cracks",
            speedBumpDamage: "Speed Bump Damage",
            rainWaterAccumulation: "Rainwater Accumulation",

            traffic: "Traffic Department",



        


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
        interpolation: { escapeValue: false }
    });

document.documentElement.dir = savedLang === "en" ? "ltr" : "rtl";
document.documentElement.lang = savedLang;

export default i18n;
