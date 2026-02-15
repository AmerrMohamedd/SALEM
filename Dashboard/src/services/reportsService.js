import { getIncidents, getIncidentById } from "./incidentsService";

function mapIncidentToReport(item) {
    const statusMap = {
        "in progress": "inProgress",
        "in_progress": "inProgress",
        "solved": "solved",
        "closed": "solved",
        "rejected": "rejected",
        "review": "underReview",
    };
    const s = String(item.status?.name ?? item.status ?? "").toLowerCase();
    const status = statusMap[s] ?? "inProgress";

    const date = item.created_at?.split?.("T")?.[0] ?? item.date ?? "";

    return {
        id: item.id,
        category: item.title ?? item.category ?? "report",
        location: item.location ?? item.region ?? "unknown",
        date,
        status,
        entity: item.department_name ?? item.entity ?? "roads",
        priority: (item.priority ?? "medium").toLowerCase(),
    };
}

export async function getReports(params = {}) {
    try {
        const res = await getIncidents(params);
        const list = res?.results ?? res?.data ?? (Array.isArray(res) ? res : []);
        return list.map(mapIncidentToReport);
    } catch (err) {
        console.error("Reports API error:", err);
        return [];
    }
}

export async function getReportById(id) {
    try {
        const item = await getIncidentById(id);
        return mapIncidentToReport(item);
    } catch (err) {
        console.error("Report detail API error:", err);
        return null;
    }
}
