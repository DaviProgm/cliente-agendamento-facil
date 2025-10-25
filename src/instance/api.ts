import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4015",
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
      localStorage.clear();
      window.location.href = "/login"; 
    }

    if (error.response?.status === 403 && 
        error.response?.data?.message === "Acesso negado. É necessário ter uma assinatura ativa para usar esta funcionalidade." && 
        window.location.pathname !== '/assinatura') {
      
      toast.error(
        "Acesso negado. Clique aqui para gerenciar sua assinatura.", 
        {
          position: "top-center",
          autoClose: 6000,
          onClick: () => { window.location.href = '/dashboard'; },
          pauseOnHover: true,
          draggable: true,
        }
      );
    }

    return Promise.reject(error);
  }
);

export default api;
