import axios from "axios";

const API = "http://localhost:5000/api";

export const getReports = async () => {
    const response = await axios.get(`${API}/reports`);
    return response.data;
};

