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
            { day: "sat", value: 10 },
            { day: "sun", value: 15 },
            { day: "mon", value: 22 },
            { day: "tue", value: 18 },
            { day: "wed", value: 64 },
            { day: "thu", value: 20 },
            { day: "fri", value: 50 },
        ],

        donutChart: [
            { name: "roads", value: 100, color: "#6C7CFF" },
            { name: "electricity", value: 62, color: "#6FD08C" },
            { name: "water", value: 50, color: "#FFB547" },
            { name: "lighting", value: 28, color: "#00C9FF" },
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
