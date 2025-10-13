import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../instance/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import EditAppointmentModal from "./EditAppointmentmodal";
import { Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
}

interface Client {
  id: number;
  name: string;
  email?: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  observations?: string;
  status?: string;
  client: Client;
  service: Service;
  clientId: number;
  serviceId: number;
}

const statusOptions = [
  "agendado",
  "confirmado",
  "em andamento",
  "concluído",
  "cancelado",
];

const AppointmentList: React.FC = () => {
  const { setIsAppointmentModalOpen } = useOutletContext() as any;
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading, isError } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await api.get("/agendamentos");
      if (!Array.isArray(res.data)) {
        toast({ title: "Erro", description: "Resposta inválida da API.", variant: "destructive" });
        return [];
      }
      return res.data.map((item: any) => ({ ...item, status: item.status ?? "agendado" }));
    }
  });

  const formatDateToBR = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const filteredAppointments = appointments
    .filter(appointment => showCompleted ? true : appointment.status !== 'concluído')
    .filter((appointment) =>
      (appointment.client?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (appointment.service?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

  const statusStyles: { [key: string]: string } = {
    agendado: "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
    confirmado: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
    'em andamento': "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
    concluído: "bg-vibrant-accent/20 text-vibrant-accent border-vibrant-accent/30 hover:bg-vibrant-accent/30",
    cancelado: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
  };

  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      await api.put(`/agendamentos/${appointmentId}/status`, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({ title: "Status atualizado", description: `O agendamento foi marcado como \"${newStatus}\".` });
    } catch {
      toast({ title: "Erro ao atualizar status", description: "Tente novamente.", variant: "destructive" });
    }
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
    queryClient.invalidateQueries({ queryKey: ["appointments"] });
  };

  if (isLoading) return <div className="text-center p-10 text-soft-text">Carregando agendamentos...</div>;
  if (isError) return <div className="text-center p-10 text-red-400">Erro ao carregar agendamentos.</div>;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-text w-4 h-4" />
            <Input
              placeholder="Buscar por cliente ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-main-background border-gradient-end focus:ring-vibrant-accent text-light-text placeholder:text-soft-text"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="show-completed" 
              checked={showCompleted} 
              onCheckedChange={(checked) => setShowCompleted(!!checked)}
              className="border-soft-text/50 data-[state=checked]:bg-vibrant-accent data-[state=checked]:text-light-text"
            />
            <label
              htmlFor="show-completed"
              className="text-sm font-medium leading-none text-soft-text peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mostrar concluídos
            </label>
          </div>
          <Button onClick={() => setIsAppointmentModalOpen(true)} className="bg-vibrant-accent text-light-text hover:bg-vibrant-accent/90">
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
              <Card className="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold truncate text-light-text">{appointment.client.name}</CardTitle>
                      <p className="text-sm text-soft-text">{appointment.service.name}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge className={`cursor-pointer ${statusStyles[appointment.status || 'agendado']}`}>
                          {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-main-background border-gradient-end text-light-text">
                        {statusOptions.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onSelect={() => handleStatusChange(appointment.id, status)}
                            className="focus:bg-gradient-end focus:text-white"
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                    <div>
                      <p className="text-base font-medium text-light-text">
                        {formatDateToBR(appointment.date)} às {appointment.time}
                      </p>
                      {appointment.observations && (
                        <p className="text-sm text-soft-text mt-1 max-w-xs truncate">{appointment.observations}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(appointment)}
                        className="bg-transparent border-soft-text/50 text-soft-text hover:bg-soft-text/10 hover:text-light-text"
                      >
                        Editar
                      </Button>
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