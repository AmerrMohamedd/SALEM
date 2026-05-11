import axios from "axios";

const client = axios.create({
  baseURL:
    "https://salemproject.pythonanywhere.com/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

// ================= REQUEST =================
client.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// ================= RESPONSE =================
client.interceptors.response.use(
  (response) => response,

  (error) => {
    // ===== Unauthorized =====
    if (
      error.response?.status === 401
    ) {
      localStorage.removeItem(
        "access"
      );

      localStorage.removeItem(
        "refresh"
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(error);
  }
);

export default client;