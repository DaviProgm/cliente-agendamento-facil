
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

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
  const [appointments, setAppointments] = useState<Appointment[]>([
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

  const handleCompleteAppointment = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: "concluído" as const }
          : appointment
      )
    );

    const appointment = appointments.find(app => app.id === appointmentId);
    
    toast({
      title: "Agendamento concluído!",
      description: `O agendamento de ${appointment?.clientName} foi marcado como concluído.`,
    });

    // Aqui você fará a integração com o backend
    console.log("Concluir agendamento ID:", appointmentId);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar agendamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onAddAppointment} className="w-full sm:w-auto">
          <Calendar className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{appointment.clientName}</CardTitle>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
                <Badge variant={getStatusColor(appointment.status)} className="self-start">
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm text-gray-600">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                  </p>
                  {appointment.notes && (
                    <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Editar
                  </Button>
                  {appointment.status === "agendado" && (
                    <Button 
                      size="sm" 
                      className="w-full sm:w-auto"
                      onClick={() => handleCompleteAppointment(appointment.id)}
                    >
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
