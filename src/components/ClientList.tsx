
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "ativo" | "inativo";
  lastAppointment: string;
}

interface ClientListProps {
  onAddClient: () => void;
}

const ClientList = ({ onAddClient }: ClientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados mock - substituir pela integração com backend
  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      status: "ativo",
      lastAppointment: "2024-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      status: "ativo",
      lastAppointment: "2024-01-10",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 77777-7777",
      status: "inativo",
      lastAppointment: "2023-12-20",
    },
  ]);

  const filteredClients = clients.filter(client =>
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
                <Badge variant={client.status === "ativo" ? "default" : "secondary"} className="self-start">
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-sm text-gray-600">
                  Último agendamento: {new Date(client.lastAppointment).toLocaleDateString('pt-BR')}
                </p>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
