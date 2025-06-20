import { useState, useEffect } from "react";
import api from "../instance/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import EditAppointmentModal from "./EditAppointmentmodal";

// Definindo tipos básicos para agendamento (ajuste conforme seu modelo real)
interface Appointment {
  id: number;
  name: string;
  service: string;
  date: string; // ISO string
  time: string;
  observations?: string;
  status?: string;
}

interface AppointmentListProps {
  onAddAppointment: () => void;
  refreshFlag: boolean; // Novo prop que vem do pai
}

const AppointmentList: React.FC<AppointmentListProps> = ({ onAddAppointment, refreshFlag }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Sempre que refreshFlag mudar, busca a lista de agendamentos
  useEffect(() => {
    fetchAppointments();
  }, [refreshFlag]);

  // Você pode manter ou retirar o useEffect sem dependências, 
  // mas assim garante atualização na montagem e no refreshFlag

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/agendamentos");

      if (!Array.isArray(res.data)) {
        toast({
          title: "Erro",
          description: "Resposta inválida da API.",
          variant: "destructive",
        });
        return;
      }

      const dataWithStatus = res.data.map((item: Appointment) => ({
        ...item,
        status: item.status ?? "agendado",
      }));

      setAppointments(dataWithStatus);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os agendamentos. Verifique autenticação.",
        variant: "destructive",
      });
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status?: string) => {
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
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: "concluído" } : appointment
      )
    );

    const appointment = appointments.find((app) => app.id === appointmentId);

    toast({
      title: "Agendamento concluído!",
      description: `O agendamento de ${appointment?.name} foi marcado como concluído.`,
    });
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
    fetchAppointments();
  };

  return (
    <>
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
                    <CardTitle className="text-lg truncate">{appointment.name}</CardTitle>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                  <Badge
                    variant={getStatusColor(appointment.status)}
                    className="self-start"
                  >
                    {appointment.status ?? "agendado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleDateString("pt-BR")} às {appointment.time}
                    </p>
                    {appointment.observations && (
                      <p className="text-sm text-gray-500 mt-1">{appointment.observations}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => handleEditClick(appointment)}
                    >
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

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        appointment={selectedAppointment}
        onUpdated={handleUpdated}
      />
    </>
  );
};

export default AppointmentList;
