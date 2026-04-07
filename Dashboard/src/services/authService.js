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

    try {
        if (refresh) {
            await api.post("/logout/", { refresh });
        }
    } catch (error) {
        console.error("Logout API error:", error);
    } finally {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
    }
};

/* ================= Password Reset (django-rest-passwordreset) ================= */
export const requestPasswordResetToken = async (email) => {
    const response = await api.post("/forgot-password/reset_password/", { email });
    return response.data;
};

export const confirmPasswordReset = async ({ token, password }) => {
    const response = await api.post("/forgot-password/reset_password_confirm/", { token, password });
    return response.data;
};
