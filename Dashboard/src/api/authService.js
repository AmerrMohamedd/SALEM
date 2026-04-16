import axiosInstance, {
    clearAuthStorage,
    createApiError,
    getRefreshToken,
    normalizeApiData,
    setAuthTokens,
    setStoredUser,
} from "./axiosInstance";

const ensureEmployeeLogin = (payload) => {
    if (payload?.user_info?.user_type !== "employee") {
        clearAuthStorage();
        throw createApiError("Employee access only", {
            response: {
                data: {
                    detail: "Employee access only",
                    errors: payload?.errors ?? null,
                },
            },
        });
    }
};

export const signup = async (data) => {
    const response = await axiosInstance.post("/signup/", data);
    return normalizeApiData(response);
};

export const getSignupMeta = async () => {
    const response = await axiosInstance.get("/registration-data/");
    return normalizeApiData(response);
};

export const loginEmployee = async ({ national_id, password }) => {
    const response = await axiosInstance.post("/login/", {
        national_id,
        password,
    });

    const payload = normalizeApiData(response) ?? response?.data ?? {};
    ensureEmployeeLogin(payload);

    setAuthTokens(payload.tokens);
    setStoredUser(payload.user_info);

    return payload;
};

export const login = loginEmployee;

export const logout = async () => {
    const refresh = getRefreshToken();

    try {
        if (refresh) {
            await axiosInstance.post("/logout/", { refresh });
        }
    } catch {
        // keep logout resilient for the UI
    } finally {
        clearAuthStorage();
    }
};

export const requestPasswordResetToken = async (email) => {
    const response = await axiosInstance.post("/forgot-password/", { email });
    return normalizeApiData(response) ?? response?.data;
};

export const validatePasswordResetToken = async (token) => {
    const response = await axiosInstance.post("/forgot-password/validate_token/", { token });
    return normalizeApiData(response) ?? response?.data;
};

export const confirmPasswordReset = async ({ token, password }) => {
    const response = await axiosInstance.post("/forgot-password/confirm/", {
        token,
        password,
    });
    return normalizeApiData(response) ?? response?.data;
};
