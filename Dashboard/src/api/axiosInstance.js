import axios from "axios";

const ACCESS_TOKEN_KEY = "access";
const REFRESH_TOKEN_KEY = "refresh";
const USER_KEY = "user";
const POSTMAN_BASE_URL = "https://salemproject.pythonanywhere.com/";

const resolveBaseUrl = () => {
    const processBaseUrl =
        typeof globalThis !== "undefined" ? globalThis.process?.env?.BASE_URL : undefined;
    const viteBaseUrl = import.meta.env?.VITE_BASE_URL;
    const viteApiUrl = import.meta.env?.VITE_API_URL;
    const baseUrl = processBaseUrl || viteBaseUrl || viteApiUrl || POSTMAN_BASE_URL;
    return String(baseUrl).replace(/\/+$/, "");
};

export const BASE_URL = resolveBaseUrl();

export const STATUS_LABELS_AR = {
    NEW: "بلاغات جديدة",
    ASSIGNED: "تم التعيين",
    IN_PROGRESS: "قيد التنفيذ",
    REVIEW: "مراجعة",
    COMPLETED: "تم الانتهاء",
};

export const PRIORITY_LABELS_AR = {
    LOW: "منخفض",
    MEDIUM: "متوسط",
    HIGH: "عالي",
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setAuthTokens = (tokens = {}) => {
    if (tokens.access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    }

    if (tokens.refresh) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    }
};

export const setStoredUser = (userInfo) => {
    if (userInfo) {
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    }
};

export const clearAuthStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const normalizeApiData = (response) => {
    const payload = response?.data;
    if (payload && typeof payload === "object" && payload.success !== undefined) {
        return payload.data;
    }
    return payload;
};

export const getApiErrors = (error) => error?.response?.data?.errors ?? error?.errors ?? null;

export const createApiError = (message, extra = {}) => {
    const error = new Error(message);
    Object.assign(error, extra);
    return error;
};

let refreshPromise = null;

const refreshAccessToken = async () => {
    const refresh = getRefreshToken();

    if (!refresh) {
        throw createApiError("Missing refresh token");
    }

    if (!refreshPromise) {
        refreshPromise = axios
            .post(
                `${BASE_URL}/refresh/`,
                { refresh },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                const payload = normalizeApiData(response) ?? response?.data ?? {};
                const accessToken = payload?.access ?? payload?.tokens?.access;

                if (!accessToken) {
                    throw createApiError("Invalid refresh response", { response });
                }

                setAuthTokens({
                    access: accessToken,
                    refresh: payload?.refresh ?? refresh,
                });

                return accessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config;
        const status = error?.response?.status;
        const requestUrl = originalRequest?.url ?? "";

        if (
            status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !requestUrl.includes("/login/") &&
            !requestUrl.includes("/refresh/")
        ) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers = originalRequest.headers ?? {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                clearAuthStorage();

                if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
