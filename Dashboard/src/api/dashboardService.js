import axiosInstance, { normalizeApiData } from "./axiosInstance";

export const getDashboardStats = async () => {
    const response = await axiosInstance.get("/incidents/stats/");
    return normalizeApiData(response);
};

export const getDashboardWeekly = async () => {
    const response = await axiosInstance.get("/incidents/weekly/");
    return normalizeApiData(response);
};

export const getDashboardRecent = async () => {
    const response = await axiosInstance.get("/incidents/recent/");
    return normalizeApiData(response);
};

export const getDashboardByDepartment = async () => {
    const response = await axiosInstance.get("/incidents/by-department/");
    return normalizeApiData(response);
};
