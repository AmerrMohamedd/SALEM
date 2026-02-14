
/* ================= Cards Data ================= */

const mockStats = {
    month: {
        total: 40689,
        open: 20879,
        inReview: 10293,
        transferred: 5029,
        solvedToday: 2040,
    },
    last7days: {
        total: 8200,
        open: 3200,
        inReview: 1800,
        transferred: 900,
        solvedToday: 450,
    },
};

export const getStatisticsCards = (period = "month") => {
    return mockStats[period];
};


/* ================= Line Chart ================= */

const months = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
];

const lineData = months.map((m) => ({
    month: m,
    value: Math.floor(Math.random() * 60) + 20,
}));

export const getLineChartData = () => {
    return lineData;
};


/* ================= Donut ================= */
const donutData = [
    { name: "roads", value: 100, color: "#6C7CFF" },
    { name: "electricity", value: 62, color: "#6FD08C" },
    { name: "water", value: 50, color: "#FFB547" },
    { name: "lighting", value: 28, color: "#00C9FF" },
];


export const getDonutData = () => {
    return donutData;
};


/* ================= Team Performance ================= */

const teamPerformanceData = [
    { id: "1", value: 200, color: "#2DD4BF" },
    { id: "2", value: 530, color: "#3B82F6" },
    { id: "3", value: 2860, color: "#2DD4BF" },
    { id: "4", value: 5800, color: "#2DD4BF" },
    { id: "5", value: 11850, color: "#3B82F6" },
];

export const getTeamPerformance = () => {
    return teamPerformanceData;
};


/* ================= Heat Map ================= */

const heatPoints = [
    [30.0444, 31.2357, 0.9],
    [30.05, 31.24, 0.7],
    [30.06, 31.25, 0.6],
];

export const getHeatPoints = () => {
    return heatPoints;
};
