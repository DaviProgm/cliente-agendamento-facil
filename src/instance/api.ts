import axios from "axios";

const api = axios.create({
  baseURL: "https://schedule-control-api.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;
