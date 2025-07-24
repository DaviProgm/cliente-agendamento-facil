import { useState } from "react";
import AppointmentList from "./AppointmentList";
import CreateAppointmentModal from "../DashboardCreditor/AddAppointmentModal";

const AppointmentsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // Quando um novo agendamento for criado, fecha o modal e dá refresh na lista
  const handleCreated = (newAppointment: any) => {
    setIsCreateModalOpen(false);
    setRefreshFlag((prev) => !prev);
  };

  return (
    <>
      <AppointmentList
        onAddAppointment={openCreateModal}
        refreshFlag={refreshFlag}
      />
      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreated={handleCreated} // importante para atualizar a lista
      />
    </>
  );
};

export default AppointmentsPage;
