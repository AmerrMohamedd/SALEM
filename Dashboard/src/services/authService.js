import api from "./api";

export const signup = async (data) => {
    const response = await api.post("/signup/", data);
    return response.data;
};

export const getSignupMeta = async () => {
    const response = await api.get("/registration-data/");
    return response.data;
};

export const login = async (data) => {
    const response = await api.post("/login/", data);
    return response.data;
};

export const logout = async () => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
        try {
            await api.post("/logout/", { refresh });
        } catch (_) {}
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
};
