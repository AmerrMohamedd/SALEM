import axiosInstance, { normalizeApiData } from "./axiosInstance";

export const getNotifications = async (params = {}) => {
    const query = {};

    if (params.page) query.page = params.page;

    const response = await axiosInstance.get("/incidents/notifications/", { params: query });
    return normalizeApiData(response);
};

export const markNotificationRead = async (id) => {
    const response = await axiosInstance.patch(`/incidents/notifications/${id}/read/`);
    return normalizeApiData(response) ?? response?.data;
};
