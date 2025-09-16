import { useState, useEffect, useCallback } from "react";
import api from "../../instance/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import EditAppointmentModal from "./EditAppointmentmodal";
import { Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Appointment {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
  observations?: string;
  status?: "agendado" | "concluído" | "cancelado" | string;
}

const statusOptions = [
  "agendado",
  "confirmado",
  "em andamento",
  "concluído",
  "cancelado",
];

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
        toast({ title: "Erro", description: "Resposta inválida da API.", variant: "destructive" });
        return;
      }
      const dataWithStatus = res.data.map((item: Appointment) => ({
        ...item,
        status: item.status ?? "agendado",
      }));
      setAppointments(dataWithStatus);
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível carregar os agendamentos.", variant: "destructive" });
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, refreshFlag]);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusStyles: { [key: string]: string } = {
    agendado: "bg-card text-primary border-primary",
    concluído: "bg-secondary text-secondary-foreground border-secondary",
    cancelado: "bg-destructive text-destructive-foreground border-destructive",
  };

  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      await api.put(`/agendamentos/${appointmentId}/status`, { status: newStatus });
      setAppointments((prev) => prev.map((a) => a.id === appointmentId ? { ...a, status: newStatus } : a));
      toast({ title: "Status atualizado", description: `O agendamento foi marcado como \"${newStatus}\".` });
    } catch {
      toast({ title: "Erro ao atualizar status", description: "Tente novamente.", variant: "destructive" });
    }
  };

  const handleCompleteAppointment = async (id: number) => {
    const ap = appointments.find((a) => a.id === id);
    if (!ap) return toast({ title: "Erro", description: "Agendamento não encontrado.", variant: "destructive" });
    try {
      await api.delete(`/agendamentos/${id}`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Concluído!", description: `O agendamento de ${ap.name} foi concluído.` });
    } catch {
      toast({ title: "Erro ao concluir", description: "Não foi possível excluir.", variant: "destructive" });
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar agendamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 placeholder:text-muted-foreground"
            />
          </div>
          <Button onClick={onAddAppointment} variant="default">
            <Calendar className="w-4 h-4 mr-2" /> Novo Agendamento
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate text-primary">{appointment.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
                    </div>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      className={`text-sm rounded px-2 py-1 border focus:outline-none focus:ring-2 focus:ring-primary ${statusStyles[appointment.status || 'agendado'] || 'bg-muted text-muted-foreground border-border'}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {formatDateToBR(appointment.date)} às {appointment.time}
                      </p>
                      {appointment.observations && (
                        <p className="text-sm text-muted-foreground mt-1">{appointment.observations}</p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditClick(appointment)}
                      >
                        Editar
                      </Button>

                      {appointment.status === "agendado" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleCompleteAppointment(appointment.id)}
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
