import api from "@/instance/api";

export async function getClients() {
  const response = await api.get("/clientes");
  return response.data;
}

export async function createClient(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const response = await api.post("/clientes", data);
  return response.data;
}
