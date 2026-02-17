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

    const date = item.created_at?.split?.("T")?.[0] ?? "";
    const dateFormatted = date ? date.split("-").reverse().join("-") : "";

    return {
        id: String(item.id ?? i),
        date: dateFormatted,
        category: item.title ?? "report",
        status,
        repairTime: item.resolution_time ?? "noTime",
        process: "roads",
        location: item.location ?? "",
    };
}

export async function getStreetsHistory(params = {}) {
    try {
        const res = await getIncidentHistory(params);

        const count = res?.count ?? 0;
        const stats = res?.results?.stats ?? res?.stats ?? null;
        const rawList = Array.isArray(res?.results) ? res.results : (res?.results?.results ?? []);
        const records = rawList.map(mapHistoryToRecord);
        return { count, stats, records };

    } catch (err) {
        console.error("Streets history API error:", err);
        return {
            count: 0,
            stats: null,
            records: []
        };
    }
}

export async function getStreetHistoryById(id) {
    const data = await getStreetsHistory();
    return data.records.find((r) => String(r.id) === String(id)) ?? null;
}
