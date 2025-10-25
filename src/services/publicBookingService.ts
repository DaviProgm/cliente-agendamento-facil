
import api from "@/instance/api";
import { format } from "date-fns";

export const getBusinessPublicProfile = async (username: string) => {
  const response = await api.get(`/public/business/${username}`);
  return response.data;
};

export const getAvailability = async (username: string, date: Date, serviceId: string, professionalId: string, unitId?: string) => {
  const dateStr = format(date, "yyyy-MM-dd");
  let url = `/public/availability/${username}?date=${dateStr}&serviceId=${serviceId}&professionalId=${professionalId}`;
  if (unitId) {
    url += `&unitId=${unitId}`;
  }
  const response = await api.get(url);
  return response.data;
};

export const createPublicSchedule = async (data: {
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  unitId?: string;
}) => {
  const response = await api.post("/public/schedules", data);
  return response.data;
};

