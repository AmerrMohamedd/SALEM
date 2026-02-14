import axios from "axios";

const api = axios.create({
    baseURL: "https://abdullahgouda.pythonanywhere.com"
});

export default api;

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token && !config.url.includes("login")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

