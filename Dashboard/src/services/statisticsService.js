import {
    getDashboardStats,
    getDashboardWeekly,
    getDashboardByDepartment,
} from "./incidentsService";

/* ================= Cards Data - from API ================= */
export const getStatisticsCards = async (period = "month") => {
    try {
        const stats = await getDashboardStats();
        return {
            solvedToday: stats?.solved_today ?? stats?.solvedToday ?? 0,
            transferred: stats?.transferred ?? 0,
            inReview: stats?.in_review ?? stats?.inReview ?? 0,
            open: stats?.open ?? 0,
            total: stats?.total ?? 0,
        };
    } catch {
        return {
            solvedToday: 0,
            transferred: 0,
            inReview: 0,
            open: 0,
            total: 0,
        };
    }
};

/* ================= Line Chart - from API ================= */
const months = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
];

export const getLineChartData = async () => {
    try {
        const weekly = await getDashboardWeekly();
        const raw = weekly?.data ?? weekly ?? [];
        if (Array.isArray(raw) && raw.length > 0) {
            return raw.map((item, i) => ({
                month: item.month ?? months[i] ?? months[i % 12],
                value: Number(item.value ?? item.count ?? 0),
            }));
        }
    } catch {}
    return months.map((m) => ({ month: m, value: 0 }));
};

/* ================= Donut - from API ================= */
const donutColors = ["#6C7CFF", "#6FD08C", "#FFB547", "#00C9FF"];
export const getDonutData = async () => {
    try {
        const byDept = await getDashboardByDepartment();
        const raw = byDept?.data ?? byDept ?? [];
        if (Array.isArray(raw) && raw.length > 0) {
            return raw.map((item, i) => ({
                name: item.name ?? item.department ?? `dept${i}`,
                value: Number(item.value ?? item.count ?? 0),
                color: item.color ?? donutColors[i % donutColors.length],
            }));
        }
    } catch {}
    return [
        { name: "roads", value: 0, color: "#6C7CFF" },
        { name: "electricity", value: 0, color: "#6FD08C" },
        { name: "water", value: 0, color: "#FFB547" },
        { name: "lighting", value: 0, color: "#00C9FF" },
    ];
};

/* ================= Team Performance ================= */
const teamColors = ["#2DD4BF", "#3B82F6", "#2DD4BF", "#2DD4BF", "#3B82F6"];
export const getTeamPerformance = () => {
    return [
        { id: "1", value: 200, color: teamColors[0] },
        { id: "2", value: 530, color: teamColors[1] },
        { id: "3", value: 2860, color: teamColors[2] },
        { id: "4", value: 5800, color: teamColors[3] },
        { id: "5", value: 11850, color: teamColors[4] },
    ];
};

/* ================= Heat Map ================= */
export const getHeatPoints = () => {
    return [
        [30.0444, 31.2357, 0.9],
        [30.05, 31.24, 0.7],
        [30.06, 31.25, 0.6],
    ];
};
