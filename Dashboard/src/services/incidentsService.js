import api from "./api";


/* ================= Incident Statuses ================= */
export const getIncidentStatuses = async () => {
    const { data } = await api.get("/incidents/statuses/");
    return data;
};

/* ================= Incident List ================= */
export const getIncidents = async (params = {}) => {
    const {
        search = "",
        status = "",
        department = "",
        dateFrom = "",
        dateTo = "",
        ordering = "-created_at",
    } = params;
    const query = { ordering };
    if (search) query.search = search;
    if (status) query.status = status;
    if (department) query.assigned_to__employee_profile__department = department;
    if (dateFrom) query["created_at__date__gte"] = dateFrom;
    if (dateTo) query["created_at__date__lte"] = dateTo;
    const { data } = await api.get("/incidents/", { params: query });
    return data;
};

/* ================= Incident Detail ================= */
export const getIncidentById = async (id) => {
    const { data } = await api.get(`/incidents/${id}/`);
    return data;
};

/* ================= My Incidents ================= */
export const getMyIncidents = async () => {
    const { data } = await api.get("/incidents/my/");
    return data;
};

/* ================= Incident Create ================= */
export const createIncident = async (payload) => {
    const { data } = await api.post("/incidents/create/", payload);
    return data;
};

/* ================= Incident Image Upload ================= */
export const uploadIncidentImage = async (incidentId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await api.post(`/incidents/${incidentId}/images/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

/* ================= Accept Incident ================= */
export const acceptIncident = async (incidentId) => {
    const { data } = await api.patch(`/incidents/${incidentId}/accept/`, {});
    return data;
};

/* ================= Change Incident Status ================= */
export const changeIncidentStatus = async (incidentId, status) => {
    const { data } = await api.patch(`/incidents/${incidentId}/change-status/`, { status });
    return data;
};

/* ================= Incident History ================= */
export const getIncidentHistory = async (params = {}) => {
    const { street = "", date = "", priority = "" } = params;
    const { data } = await api.get("/incidents/history/", {
        params: { street, date, priority },
    });
    return data;
};

/* ================= Departments (Postman: Department List) ================= */
export const getDepartments = async () => {
    const { data } = await api.get("/departments/");
    return data;
};

/* ================= Dashboard APIs ================= */
export const getDashboardStats = async () => {
    const { data } = await api.get("/incidents/dashboard/stats/");
    return data;
};

export const getDashboardWeekly = async () => {
    const { data } = await api.get("/incidents/dashboard/weekly/");
    return data;
};

export const getDashboardRecent = async () => {
    const { data } = await api.get("/incidents/dashboard/recent/");
    return data;
};

export const getDashboardByDepartment = async () => {
    const { data } = await api.get("/incidents/dashboard/by-department/");
    return data;
};
