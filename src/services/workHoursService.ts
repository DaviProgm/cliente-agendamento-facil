import api from "@/instance/api";

interface WorkHour {
  dayOfWeek: number;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

export const getWorkHours = async (): Promise<WorkHour[]> => {
  const response = await api.get("/work-hours");
  console.log('API response for getWorkHours:', response.data);
  return response.data;
};

export const saveWorkHours = async (workHours: WorkHour[]) => {
  const dataToSend = workHours.map(({ dayOfWeek, startTime, endTime, isAvailable }) => ({
    dayOfWeek,
    startTime,
    endTime,
    isAvailable,
  }));
  const response = await api.post("/work-hours", { workHours: dataToSend });
  return response.data;
};
