
import api from '@/instance/api';

export const getUnits = async () => {
  const response = await api.get('/units');
  return response.data;
};

export const createUnit = async (data: { name: string; address: string }) => {
  const response = await api.post('/units', data);
  return response.data;
};

export const updateUnit = async (id: string, data: { name: string; address: string }) => {
  const response = await api.put(`/units/${id}`, data);
  return response.data;
};

export const deleteUnit = async (id: string) => {
  const response = await api.delete(`/units/${id}`);
  return response.data;
};
