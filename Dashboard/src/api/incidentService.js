import axiosInstance, {
    normalizeApiData,
    PRIORITY_LABELS_AR,
    STATUS_LABELS_AR,
} from "./axiosInstance";

const getStatusToken = (value) =>
    String(value ?? "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/-/g, "_");

export const mapStatusToArabic = (status) => STATUS_LABELS_AR[getStatusToken(status)] ?? status;
export const mapPriorityToArabic = (priority) => PRIORITY_LABELS_AR[getStatusToken(priority)] ?? priority;

const WORKFLOW_STATUS_TO_API = {
    new: "NEW",
    assigned: "ASSIGNED",
    inProgress: "IN_PROGRESS",
    review: "REVIEW",
    done: "COMPLETED",
};

export const getIncidentStatuses = async () => {
    const response = await axiosInstance.get("/incidents/statuses/");
    const payload = normalizeApiData(response);

    if (!Array.isArray(payload)) {
        return payload ?? [];
    }

    return payload.map((item) => ({
        ...item,
        englishName: item.name,
        name: mapStatusToArabic(item.name),
    }));
};

export const getIncidents = async (params = {}) => {
    const query = {};

    if (params.status) query.status = params.status;
    if (params.priority) query.priority = getStatusToken(params.priority);
    if (params.date) query.date = params.date;
    if (params.department) query.assigned_to__employee_profile__department = params.department;
    if (params.dateFrom) query.created_at__date__gte = params.dateFrom;
    if (params.dateTo) query.created_at__date__lte = params.dateTo;
    if (params.incidentType) query.incident_type = params.incidentType;
    if (params.search) query.search = params.search;
    if (params.ordering) query.ordering = params.ordering;
    if (params.page) query.page = params.page;

    const response = await axiosInstance.get("/incidents/", { params: query });
    return normalizeApiData(response);
};

export const getIncidentById = async (id) => {
    const response = await axiosInstance.get(`/incidents/${id}/`);
    return normalizeApiData(response);
};

export const getMyIncidents = async () => {
    const response = await axiosInstance.get("/incidents/my/");
    return normalizeApiData(response);
};

export const createIncident = async (payload) => {
    const response = await axiosInstance.post("/incidents/create/", payload);
    return normalizeApiData(response) ?? response?.data;
};

export const uploadIncidentImage = async (incidentId, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post(`/incidents/${incidentId}/images/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return normalizeApiData(response) ?? response?.data;
};

export const acceptIncident = async (incidentId) => {
    const response = await axiosInstance.patch(`/incidents/${incidentId}/accept/`);
    return normalizeApiData(response) ?? response?.data;
};

export const changeIncidentStatus = async (incidentId, status) => {
    const response = await axiosInstance.patch(`/incidents/${incidentId}/change-status/`, {
        status: WORKFLOW_STATUS_TO_API[status] ?? getStatusToken(status),
    });
    return normalizeApiData(response) ?? response?.data;
};

export const getIncidentHistory = async (params = {}) => {
    const query = {};

    if (params.search) query.search = params.search;
    if (params.street) query.search = params.street;
    if (params.date) query.date = params.date;
    if (params.type) query.type = params.type;
    if (params.priority) query.priority = getStatusToken(params.priority);
    if (params.page) query.page = params.page;

    const response = await axiosInstance.get("/incidents/history/", { params: query });
    return normalizeApiData(response);
};

export const getDepartments = async () => {
    const response = await axiosInstance.get("/departments/");
    return normalizeApiData(response);
};

export const getWorkflowBoard = async () => {
    const response = await axiosInstance.get("/incidents/workflow/");
    return normalizeApiData(response);
};
