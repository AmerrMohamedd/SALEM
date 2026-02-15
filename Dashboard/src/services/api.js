import axios from "axios";
import { toast } from "../utils/swal";

// Base URL - use env or default to backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
                toast({ icon: "error", title: "Session expired", timer: 2000 }).then(() => {
                    window.location.href = "/login";
                });
            }
        }
        return Promise.reject(err);
    }
);

export default api;

// screen 4 - get incident history with params and auth
export const getIncidentHistory = async (params = {}, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/incidents/history/`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("History API Error:", error);
    throw error;
  }
};
