import {
    getDashboardStats,
    getDashboardWeekly,
    getDashboardRecent,
    getDashboardByDepartment,
} from "./incidentsService";

/* Map API response to UI format */
function mapStatsToCards(apiStats = {}) {
    return {
        solvedToday: apiStats.resolved_today ?? 0,
        transferred: apiStats.rejected ?? 0,
        inReview: apiStats.in_progress ?? 0,
        open: apiStats.pending ?? 0,
        total: apiStats.total ?? 0,
    };
}

function mapWeeklyToLineChart(apiData = []) {
    if (Array.isArray(apiData) && apiData.length > 0) {
        return apiData.map((item) => {
            const date = new Date(item.day);
            const day = date
                .toLocaleDateString("en-US", { weekday: "short" })
                .toLowerCase();

            return {
                day: day,
                value: Number(item.count ?? 0),
            };
        });
    }

    return [
        { day: "sat", value: 0 },
        { day: "sun", value: 0 },
        { day: "mon", value: 0 },
        { day: "tue", value: 0 },
        { day: "wed", value: 0 },
        { day: "thu", value: 0 },
        { day: "fri", value: 0 },
    ];
}


function mapByDeptToDonut(apiData = []) {
    const colors = ["#6C7CFF", "#6FD08C", "#FFB547", "#00C9FF"];
    if (Array.isArray(apiData) && apiData.length > 0) {
        return apiData.map((item, i) => ({
            name: item.department || "Unknown",
            value: Number(item.value ?? item.count ?? 0),
            color: item.color ?? colors[i % colors.length],
        }));
    }
    return [
        { name: "road", value: 0, color: "#6C7CFF" },
        { name: "elec", value: 0, color: "#6FD08C" },
        { name: "water", value: 0, color: "#FFB547" },
        { name: "gas", value: 0, color: "#00C9FF" },
    ];
}

function mapRecentToReports(apiData = []) {
    if (!Array.isArray(apiData)) return [];
    return apiData.map((item) => ({
        id: item.id,
        date: item.date?.split?.("T")?.[0] ?? "",
        status: mapApiStatusToUi(item.status),
        entity: item.department ?? "roads",
    }));
}


function mapApiStatusToUi(status) {
    if (!status) return "inProgress";
    const s = String(status).toLowerCase();
    if (s.includes("progress") || s.includes("open")) return "inProgress";
    if (s.includes("review")) return "underReview";
    if (s.includes("solved") || s.includes("closed") || s.includes("done")) return "solved";
    return "inProgress";
}

export const getHomeData = async () => {
    try {
        const [stats, weekly, recent, byDept] = await Promise.all([
            getDashboardStats(),
            getDashboardWeekly(),
            getDashboardRecent(),
            getDashboardByDepartment(),
        ]);

        return {
            cards: mapStatsToCards(stats),
            lineChart: mapWeeklyToLineChart(weekly?.data ?? weekly),
            donutChart: mapByDeptToDonut(byDept?.data ?? byDept),
            reports: mapRecentToReports(recent?.data ?? recent ?? []),
            notifications: [], // API collection has no notifications - keep empty or add later
        };
    } catch (err) {
        console.error("Error loading home data:", err);
        return {
            cards: { solvedToday: 0, transferred: 0, inReview: 0, open: 0, total: 0 },
            lineChart: [
                { day: "sat", value: 0 },
                { day: "sun", value: 0 },
                { day: "mon", value: 0 },
                { day: "tue", value: 0 },
                { day: "wed", value: 0 },
                { day: "thu", value: 0 },
                { day: "fri", value: 0 },
            ],
            donutChart: [
                { name: "road", value: 0, color: "#6C7CFF" },
                { name: "elec", value: 0, color: "#6FD08C" },
                { name: "water", value: 0, color: "#FFB547" },
                { name: "gas", value: 0, color: "#00C9FF" },
            ],
            reports: [],
            notifications: [],
        };
    }
};
