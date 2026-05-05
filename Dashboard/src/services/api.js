import axios from "axios";

const api = axios.create({
    baseURL: "/", // 👈 نخليه local
});

// ❌ نلغي أي interceptors
api.interceptors.request.use((config) => config);
api.interceptors.response.use((res) => res);

export default api;