import axios from "axios";

const api = axios.create({
  baseURL: "https://schedule-control-api.onrender.com",
});

// Interceptor para enviar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para logout automático em 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      window.location.href = "/login"; // redireciona pra login
    }
    return Promise.reject(error);
  }
);

export default api;
