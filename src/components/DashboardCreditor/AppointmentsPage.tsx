import { useState } from "react";
import AppointmentList from "./AppointmentList";
import CreateAppointmentModal from "../DashboardCreditor/AddAppointmentModal";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const AppointmentsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleCreated = (newAppointment: any) => {
    setIsCreateModalOpen(false);
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 max-w-5xl mx-auto">
      <Card className="bg-gradient-to-br from-white via-[#f1ecff] to-[#e6ffd9] border-none shadow-lg mb-6">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-[#8B5CF6] text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#8B5CF6]" />
            Agendamentos
          </CardTitle>
        </CardHeader>
      </Card>

      <AppointmentList
        onAddAppointment={openCreateModal}
        refreshFlag={refreshFlag}
      />
      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default AppointmentsPage;
