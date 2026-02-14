/* ================= Notifications Mock Data ================= */

const notifications = Array.from({ length: 20 }).map((_, i) => {
    const index = i + 1;

    return {
        id: index,
        reportId: 1000 + index,

        name: {
            ar: `أحمد محمد ${index}`,
            en: `Ahmed Mohamed ${index}`,
        },

        email: `ahmed${index}@salem.com`,

        subject: {
            ar: "بلاغ جديد",
            en: "New Report",
        },

        message: {
            ar: "تم استلام بلاغ جديد برجاء المراجعة",
            en: "A new report has been received. Please review.",
        },

        priority: index % 3 === 0
            ? "high"
            : index % 3 === 1
                ? "medium"
                : "low",

        selected: false,
    };
});


/* ================= Exports ================= */

export const getNotifications = () => {
    return notifications;
};
