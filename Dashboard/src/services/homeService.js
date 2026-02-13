/*
  🔹 Temporary mock data
  ❗ سيتم استبداله بالـ API من الباك إند
*/

export const getHomeData = async () => {
    return {
        cards: {
            solvedToday: 40689,
            transferred: 20879,
            inReview: 5029,
            open: 4528,
            total: 40689,
        },

        lineChart: [
            { day: "Sat", value: 10 },
            { day: "Sun", value: 15 },
            { day: "Mon", value: 22 },
            { day: "Tue", value: 18 },
            { day: "Wed", value: 64 },
            { day: "Thu", value: 20 },
            { day: "Fri", value: 50 },
        ],

        donutChart: [
            { name: "Roads", value: 100, color: "#6C7CFF" },
            { name: "Electricity", value: 62, color: "#6FD08C" },
            { name: "Water", value: 50, color: "#FFB547" },
            { name: "Lighting", value: 28, color: "#00C9FF" },
        ],

        reports: [
            { id: 1025, date: "2025-10-30", status: "inProgress", entity: "electricity" },
            { id: 1027, date: "2025-10-30", status: "underReview", entity: "water" },
            { id: 1028, date: "2025-10-30", status: "solved", entity: "roads" },
        ],

        notifications: [
            { text: "notif1", percent: 15 },
            { text: "notif2", percent: 45 },
            { text: "notif3", percent: 100 },
        ]
    };
};
