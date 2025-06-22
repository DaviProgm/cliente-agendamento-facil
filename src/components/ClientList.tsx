// src/components/ClientList.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientDetailsModal from "@/components/ClientDetailsModal";
import api from "@/instance/api";
import { toast } from "@/hooks/use-toast";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: "ativo" | "inativo";
  lastAppointment?: string | null;
}

interface ClientListProps {
  onAddClient: () => void;
}

const ClientList = ({ onAddClient }: ClientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Função para formatar data ISO para dd/MM/yyyy
  const formatDate = (isoDate?: string | null) => {
    if (!isoDate) return "Nenhum";
    const [year, month, day] = isoDate.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchClientsWithLastAppointment = async () => {
      try {
        const responseClients = await api.get("/clientes");
        const clientsData: Client[] = responseClients.data;

        const clientsWithLastAppointment = await Promise.all(
          clientsData.map(async (client) => {
            try {
              const resSchedules = await api.get(`/agendamentos?clientId=${client.id}`);
              const schedules = resSchedules.data;
              schedules.sort(
                (a: { date: string }, b: { date: string }) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              const lastAppointment = schedules.length > 0 ? schedules[0].date : null;
              return { ...client, status: client.status || "ativo", lastAppointment };
            } catch {
              return { ...client, status: client.status || "ativo", lastAppointment: null };
            }
          })
        );

        setClients(clientsWithLastAppointment);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        toast({
          title: "Erro ao carregar clientes",
          description: "Verifique sua conexão ou tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    };

    fetchClientsWithLastAppointment();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onAddClient} className="w-full sm:w-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{client.name}</CardTitle>
                  <p className="text-sm text-gray-600 truncate">{client.email}</p>
                  <p className="text-sm text-gray-600">{client.phone}</p>
                </div>
                <Badge
                  variant={client.status === "ativo" ? "default" : "secondary"}
                  className="self-start"
                >
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-sm text-gray-600">
                  Último agendamento: {formatDate(client.lastAppointment)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setSelectedClient(client);
                    setDetailsModalOpen(true);
                  }}
                >
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ClientDetailsModal
        client={selectedClient}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />
    </div>
  );
};

export default ClientList;
