import {
    getIncidents,
    getIncidentById,
    acceptIncident,
    changeIncidentStatus,
    mapPriorityToArabic,
    mapStatusToArabic,
} from "./incidentsService";
import { BASE_URL } from "../api/axiosInstance";
import { normalizePriorityKey, toReportsStatusKey } from "../utils/apiMapping";

function normalizeImage(path) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return `${BASE_URL.replace(/\/$/, "")}${path}`;
    return `${BASE_URL.replace(/\/$/, "")}/${path}`;
}

function mapIncidentToReport(item) {
    return {
        id: item.id,
        category: item.title ?? item.category ?? "report",
        location: item.location ?? "unknown",
        date: item.created_at?.split?.("T")?.[0] ?? "",
        status: toReportsStatusKey(item.status),
        statusLabel: mapStatusToArabic(item.status),
        entity: item.department_name ?? item.department ?? item.assigned_to?.employee_profile?.department_name ?? "Unknown",
        priority: normalizePriorityKey(item.priority),
        priorityLabel: mapPriorityToArabic(item.priority),
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
