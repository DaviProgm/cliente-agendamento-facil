import api from "@/instance/api";

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (data: { username?: string; bio?: string }) => {
  const response = await api.put("/users/profile", data);
  return response.data;
};

export const setDefaultWorkHours = async (userId: string) => {
  const response = await api.post(`/users/${userId}/set-default-work-hours`);
  return response.data;
};
