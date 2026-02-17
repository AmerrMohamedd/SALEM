import {
    getIncidents,
    getIncidentById,
    acceptIncident,
    changeIncidentStatus,
} from "./incidentsService";
import { BASE_URL } from "./api"; 

/* -----------------------------
   Helpers
------------------------------ */

function mapStatusToUi(status) {
    const statusMap = {
        pending: "inProgress",
        assigned: "inProgress",
        "in progress": "inProgress",
        review: "underReview",
        rejected: "rejected",
        completed: "solved",
        resolved: "solved",
    };

    const s = String(status ?? "").toLowerCase();
    return statusMap[s] ?? "inProgress";
}

function normalizeImage(path) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path}`;
}

/* -----------------------------
   Mapping
------------------------------ */

function mapStatusFromApi(status) {
    if (status == null) return "inProgress";
    const s = typeof status === "object" ? status?.name ?? status?.id ?? "" : String(status);
    return mapStatusToUi(s);
}

function mapIncidentToReport(item) {
    return {
        id: item.id,
        category: item.title ?? item.category ?? "report",
        location: item.location ?? "unknown",
        date: item.created_at?.split?.("T")?.[0] ?? "",
        status: mapStatusFromApi(item.status),
        entity: item.department_name ?? item.department ?? item.assigned_to?.employee_profile?.department_name ?? "Unknown",
        priority: (item.priority ?? "medium").toLowerCase(),
    };
}

/* -----------------------------
   List + Filtering
------------------------------ */

export async function getReports(params = {}) {
    try {
        const res = await getIncidents(params);

        const list =
            res?.results ??
            res?.data ??
            (Array.isArray(res) ? res : []);

        return list.map(mapIncidentToReport);
    } catch (err) {
        console.error("Reports API error:", err);
        return [];
    }
}

/* -----------------------------
   Details
------------------------------ */

export async function getReportById(id) {
    try {
        const item = await getIncidentById(id);
        const base = mapIncidentToReport(item);
        const beforeImage = normalizeImage(item.images?.[0]?.image ?? item.image ?? item.before_image);
        const afterImage = normalizeImage(item.verification_image ?? item.after_image ?? item.images?.[1]?.image);
        return {
            ...base,
            beforeImage: beforeImage || null,
            afterImage: afterImage || null,
            aiAnalysis: item.verification_comment ?? item.ai_analysis ?? null,
            latitude: item.latitude,
            longitude: item.longitude,
        };
    } catch (err) {
        console.error("Report detail API error:", err);
        return null;
    }
}

/* -----------------------------
   Workflow Actions
------------------------------ */

export async function acceptReport(id) {
    try {
        await acceptIncident(id);
        return true;
    } catch (err) {
        console.error("Accept error:", err);
        return false;
    }
}

export async function updateReportStatus(id, newStatus) {
    try {
        await changeIncidentStatus(id, newStatus);
        return true;
    } catch (err) {
        console.error("Status change error:", err);
        return false;
    }
}
