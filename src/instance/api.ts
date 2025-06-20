import axios from "axios";

const api = axios.create({
  baseURL: "https://schedule-control-api.onrender.com",
});

// Interceptor para enviar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
