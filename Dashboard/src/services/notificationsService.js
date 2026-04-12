import api from "./api";

/**
 * Map API notification → shape expected by NotificationsTableRows (name/subject/message as { ar, en }).
 */
function mapNotificationItem(raw, index) {
    const id = raw.id ?? raw.pk ?? index;
    const title = raw.title ?? raw.subject ?? raw.header ?? "Notification";
    const body = raw.message ?? raw.body ?? raw.content ?? raw.description ?? "";
    const user = raw.user ?? raw.sender ?? {};
    const nameAr = raw.user_name_ar ?? user.full_name ?? user.name ?? raw.name ?? `User ${id}`;
    const nameEn = raw.user_name_en ?? user.full_name ?? user.name ?? raw.name ?? `User ${id}`;
    const email = raw.email ?? user.email ?? "";

    const pr = String(raw.priority ?? raw.level ?? "medium").toLowerCase();
    const priority = pr.includes("high") ? "high" : pr.includes("low") ? "low" : "medium";

    return {
        id,
        reportId: raw.report_id ?? raw.incident_id ?? raw.related_incident_id ?? id,
        name: { ar: String(nameAr), en: String(nameEn) },
        email: String(email),
        subject: { ar: String(title), en: String(title) },
        message: { ar: String(body), en: String(body) },
        priority,
        read: Boolean(raw.read ?? raw.is_read),
        selected: false,
    };
}

/**
 * GET …/api/incidents/notifications/ (Postman: {{base_url}}/notifications/)
 */
export async function getNotifications() {
    const { data } = await api.get("/incidents/notifications/");
    const list = data?.results ?? data?.data ?? (Array.isArray(data) ? data : []);
    return list.map((item, i) => mapNotificationItem(item, i));
}

/**
 * PATCH …/api/incidents/notifications/:id/read/
 */
export async function markNotificationRead(id) {
    const { data } = await api.patch(`/incidents/notifications/${id}/read/`, {});
    return data;
}
