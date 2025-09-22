import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientDetailsModal from "@/components/DashboardCreditor/ClientDetailsModal";
import api from "@/instance/api";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: "ativo" | "inativo";
  lastAppointment?: string | null;
}

const ClientList = () => {
  const { setIsClientModalOpen } = useOutletContext() as any;
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar cliente..."
            className="max-w-sm pl-9 placeholder:text-muted-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setIsClientModalOpen(true)}
          variant="default"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{client.name}</CardTitle>
                      <p className="text-sm truncate text-muted-foreground">{client.email}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`self-start ${client.status === "ativo" ? "bg-secondary/50 text-secondary-foreground" : "bg-destructive/50 text-destructive-foreground"}`}
                    >
                      {client.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      Último agendamento: {formatDate(client.lastAppointment)}
                    </p>
                    <Button
                      variant="secondary"
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
            </motion.div>
          ))}
        </AnimatePresence>
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

