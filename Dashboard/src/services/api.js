import axios from "axios";
import { toast } from "../utils/swal";

// Base URL - use env or default to backend (Postman: base_url)
export const BASE_URL = import.meta.env.VITE_API_URL || "https://abdullahgouda.pythonanywhere.com";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Request: add Bearer token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response: handle 401 - clear auth and redirect to login
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");
            if (!window.location.pathname.includes("/login")) {
                const isAr = typeof window !== "undefined" && localStorage.getItem("lang") === "ar";
                toast({ icon: "error", title: isAr ? "انتهت الجلسة" : "Session expired", timer: 2000 }).then(() => {
                    window.location.href = "/login";
                });
            }
        }
        return Promise.reject(err);
    }
);

export default api;
