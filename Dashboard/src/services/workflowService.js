import { getWorkflowBoard, getMyIncidents, getIncidentStatuses, getIncidents } from "./incidentsService";

/* Map API incident to workflow card format */
function mapIncidentToWorkflow(inc) {
    const statusMap = {
        "new": "new",
        "open": "new",
        "assigned": "assigned",
        "in progress": "inProgress",
        "in_progress": "inProgress",
        "review": "review",
        "under review": "review",
        "done": "done",
        "solved": "done",
        "closed": "done",
    };
    const s = String(inc.status?.name ?? inc.status ?? "").toLowerCase();
    const status = statusMap[s] ?? "new";

    const time = inc.created_at
        ? Math.floor((Date.now() - new Date(inc.created_at).getTime()) / 60000)
        : 0;
    const unit = time >= 60 ? "hours" : "minutes";
    const displayTime = time >= 60 ? Math.floor(time / 60) : time;

    return {
        id: inc.id,
        status,
        title: inc.title ?? inc.category ?? "report",
        location: inc.location ?? inc.region ?? "unknown",
        time: displayTime,
        unit,
        priority: (inc.priority ?? "medium").toLowerCase(),
    };
}

export async function getWorkflowReports() {
    try {
        // Preferred: backend workflow board endpoint (employees only)
        const data = await getWorkflowBoard();
        const list = data?.results ?? data?.data ?? (Array.isArray(data) ? data : []);
        return list.map(mapIncidentToWorkflow);
    } catch (err) {
        // Fallback to incidents list if workflow endpoint is unavailable
        try {
            const res = await getIncidents({ ordering: "-created_at" });
            const list = res?.results ?? res?.data ?? (Array.isArray(res) ? res : []);
            return list.map(mapIncidentToWorkflow);
        } catch {
            console.error("Workflow API error:", err);
            return [];
        }
    }
}

export async function getMyWorkflowReports() {
    try {
        const res = await getMyIncidents();
        const list = res?.results ?? res?.data ?? (Array.isArray(res) ? res : []);
        return list.map(mapIncidentToWorkflow);
    } catch (err) {
        console.error("My incidents API error:", err);
        return [];
    }
}

export async function getWorkflowStatuses() {
    try {
        const res = await getIncidentStatuses();
        return res?.results ?? res ?? [];
    } catch {
        return [];
    }
}
