import api from "@/instance/api";
import { format } from "date-fns";

export const getProviderData = async (username: string) => {
  const response = await api.get(`/public/provider/${username}`);
  return response.data;
};

export const getAvailability = async (username: string, date: Date, serviceId: number) => {
  const dateStr = format(date, "yyyy-MM-dd");
  const response = await api.get(`/public/availability/${username}?date=${dateStr}&serviceId=${serviceId}`);
  console.log('API response for getAvailability:', response.data);
  return response.data;
};

export const createAppointment = async (data: {
  providerUsername: string;
  serviceId: number;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}) => {
  const response = await api.post("/public/schedules", data);
  return response.data;
};
