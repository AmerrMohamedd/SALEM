import {
    getWorkflowBoard,
    getMyIncidents,
    getIncidentStatuses,
    getIncidents,
} from "./incidentsService";
import { normalizePriorityKey, toWorkflowStatusKey } from "../utils/apiMapping";

/**
 * Map one incident record → shape expected by WorkflowCard + column filters.
 */
function mapIncidentToWorkflow(inc, forcedStatusKey) {
    const status = forcedStatusKey ?? toWorkflowStatusKey(inc.status);

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
        priority: normalizePriorityKey(inc.priority),
        created_at: inc.created_at,
    };
}

/**
 * Backend may return:
 * - Flat list / paginated `{ results: [...] }`
 * - Grouped object: `{ "Pending": { incidents: [...] }, ... }`
 */
function normalizeWorkflowBoardResponse(data) {
    if (!data) return [];

    const asArray = data?.results ?? data?.data;
    if (Array.isArray(asArray)) return asArray.map((inc) => mapIncidentToWorkflow(inc));

    if (Array.isArray(data)) return data.map((inc) => mapIncidentToWorkflow(inc));

    if (typeof data === "object") {
        const keys = Object.keys(data);
        const grouped = keys.some((k) => Array.isArray(data[k]?.incidents));
        if (grouped) {
            const out = [];
            for (const statusName of keys) {
                const incidents = data[statusName]?.incidents ?? [];
                const columnKey = toWorkflowStatusKey(statusName);
                for (const inc of incidents) {
                    out.push(mapIncidentToWorkflow(inc, columnKey));
                }
            }
            return out;
        }
    }

    return [];
}

export async function getWorkflowReports() {
    let workflowErr;
    try {
        const data = await getWorkflowBoard();
        const list = normalizeWorkflowBoardResponse(data);
        if (list.length) return list;
    } catch (err) {
        workflowErr = err;
        console.error("Workflow API error:", err);
    }

    try {
        const res = await getIncidents({ ordering: "-created_at" });
        const raw = res?.results ?? res?.data ?? (Array.isArray(res) ? res : []);
        return raw.map((inc) => mapIncidentToWorkflow(inc));
    } catch (e2) {
        console.error("Workflow fallback (incidents list) error:", e2);
        throw workflowErr ?? e2;
    }
}

export async function getMyWorkflowReports() {
    try {
        const res = await getMyIncidents();
        const list = res?.results ?? res?.data ?? (Array.isArray(res) ? res : []);
        return list.map((inc) => mapIncidentToWorkflow(inc));
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
