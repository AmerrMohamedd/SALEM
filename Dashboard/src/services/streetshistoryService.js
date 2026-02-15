import { getIncidentHistory } from "./incidentsService";

function mapHistoryToRecord(item, i) {
    const statusMap = {
        "in progress": "inProgress",
        "in_progress": "inProgress",
        "solved": "solved",
        "closed": "solved",
        "rejected": "rejected",
    };
    const s = String(item.status ?? "").toLowerCase();
    const status = statusMap[s] ?? "inProgress";

    const date = item.created_at?.split?.("T")?.[0] ?? item.date ?? "";
    const dateFormatted = date ? date.split("-").reverse().join("-") : "";

    return {
        id: String(item.id ?? i),
        date: dateFormatted,
        category: item.title ?? item.category ?? "report",
        status,
        repairTime: item.repair_time ?? "noTime",
        process: item.department_name ?? item.entity ?? "roads",
        location: item.location ?? "",
    };
}

export async function getStreetsHistory(params = {}) {
    try {
        const res = await getIncidentHistory(params);
        const list = res?.results ?? res?.data ?? (Array.isArray(res) ? res : []);
        return list.map(mapHistoryToRecord);
    } catch (err) {
        console.error("Streets history API error:", err);
        return [];
    }
}

export async function getStreetHistoryById(id) {
    const list = await getStreetsHistory();
    return list.find((r) => String(r.id) === String(id)) ?? null;
}
