
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: "agendado" | "concluído" | "cancelado";
  notes?: string;
}

interface AppointmentListProps {
  onAddAppointment: () => void;
}

const AppointmentList = ({ onAddAppointment }: AppointmentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados mock - substituir pela integração com backend
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      clientName: "João Silva",
      service: "Consulta",
      date: "2024-01-20",
      time: "10:00",
      status: "agendado",
      notes: "Primeira consulta",
    },
    {
      id: 2,
      clientName: "Maria Santos",
      service: "Retorno",
      date: "2024-01-20",
      time: "11:00",
      status: "agendado",
    },
    {
      id: 3,
      clientName: "Pedro Costa",
      service: "Consulta",
      date: "2024-01-19",
      time: "14:00",
      status: "concluído",
    },
  ]);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado":
        return "default";
      case "concluído":
        return "secondary";
      case "cancelado":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar agendamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onAddAppointment}>
          <Calendar className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{appointment.clientName}</CardTitle>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
                <Badge variant={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                  </p>
                  {appointment.notes && (
                    <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  {appointment.status === "agendado" && (
                    <Button size="sm">
                      Concluir
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
