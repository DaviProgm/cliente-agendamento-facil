import api from "@/instance/api";

// Tipos para os dados do serviço
interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
  userId: number;
}

interface CreateServiceData {
  name: string;
  duration: number;
  price: string;
}

interface UpdateServiceData {
  name?: string;
  duration?: number;
  price?: string;
}

/**
 * Busca todos os serviços do usuário logado.
 * @returns Uma promessa que resolve para um array de serviços.
 */
export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services');
  return response.data;
};

/**
 * Cria um novo serviço.
 * @param data - Os dados para o novo serviço.
 * @returns Uma promessa que resolve para o serviço criado.
 */
export const createService = async (data: CreateServiceData): Promise<Service> => {
  const response = await api.post<Service>('/services', data);
  return response.data;
};

/**
 * Atualiza um serviço existente.
 * @param id - O ID do serviço a ser atualizado.
 * @param data - Os dados a serem atualizados.
 * @returns Uma promessa que resolve para o serviço atualizado.
 */
export const updateService = async (id: number, data: UpdateServiceData): Promise<Service> => {
  const response = await api.put<Service>(`/services/${id}`, data);
  return response.data;
};

/**
 * Deleta um serviço.
 * @param id - O ID do serviço a ser deletado.
 * @returns Uma promessa que é resolvida quando o serviço é deletado.
 */
export const deleteService = async (id: number): Promise<void> => {
  await api.delete(`/services/${id}`);
};
