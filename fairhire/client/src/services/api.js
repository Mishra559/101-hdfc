import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
});

export const createJob = async (payload) => {
  const { data } = await api.post("/jobs", payload);
  return data;
};

export const getReportSummary = async () => {
  const { data } = await api.get("/reports/summary");
  return data;
};

export default api;
