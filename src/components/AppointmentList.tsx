import { useState, useEffect, useCallback } from "react";
import api from "../instance/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import EditAppointmentModal from "./EditAppointmentmodal";

// Tipos
interface Appointment {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
  observations?: string;
  status?: "agendado" | "concluído" | "cancelado" | string;
}

interface AppointmentListProps {
  onAddAppointment: () => void;
  refreshFlag: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ onAddAppointment, refreshFlag }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const formatDateToBR = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchAppointments = useCallback(async () => {
    try {
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
        description: "Não foi possível carregar os agendamentos. Verifique a autenticação.",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, refreshFlag]);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string = "agendado") => {
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

  const handleCompleteAppointment = async (appointmentId: number) => {
    const appointment = appointments.find((app) => app.id === appointmentId);

    if (!appointment) {
      toast({
        title: "Erro",
        description: "Agendamento não encontrado.",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.delete(`/${appointmentId}`);

      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );

      toast({
        title: "Agendamento concluído!",
        description: `O agendamento de ${appointment.name} foi concluido com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao concluir agendamento:", error);
      toast({
        title: "Erro ao concluir",
        description: "Não foi possível excluir o agendamento.",
        variant: "destructive",
      });
    }
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
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      {formatDateToBR(appointment.date)} às {appointment.time}
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
