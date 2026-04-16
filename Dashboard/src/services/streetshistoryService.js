import { getIncidentHistory, mapPriorityToArabic, mapStatusToArabic } from "./incidentsService";

function mapHistoryToRecord(item, i) {
    const statusMap = {
        NEW: "inProgress",
        ASSIGNED: "inProgress",
        IN_PROGRESS: "inProgress",
        REVIEW: "inProgress",
        COMPLETED: "solved",
    };

    const token = String(item.status ?? "").trim().toUpperCase().replace(/\s+/g, "_");
    const status = statusMap[token] ?? "inProgress";

    const date = item.date?.split?.("T")?.[0] ?? item.created_at?.split?.("T")?.[0] ?? "";
    const dateFormatted = date ? date.split("-").reverse().join("-") : "";

    return {
        id: String(item.id ?? i),
        date: dateFormatted,
        category: item.type ?? item.title ?? "report",
        status,
        statusLabel: mapStatusToArabic(item.status),
        repairTime: item.resolution_time ?? "noTime",
        priorityLabel: mapPriorityToArabic(item.priority),
        process: "roads",
        location: item.location ?? "",
    };
}

export async function getStreetsHistory(params = {}) {
    try {
        const res = await getIncidentHistory(params);

        const count = res?.count ?? 0;
        const nestedResults = res?.results ?? {};
        const rawStats = nestedResults?.stats ?? null;
        const stats = rawStats
            ? {
                total_incidents: rawStats.total ?? 0,
                most_common_priority: rawStats.most_common_type ?? "-",
                average_resolution_time: rawStats.avg_resolution_time ?? null,
            }
            : null;
        const rawList = Array.isArray(nestedResults?.data) ? nestedResults.data : [];
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
