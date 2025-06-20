import { useState } from "react";
import AppointmentList from "./AppointmentList";
import CreateAppointmentModal from "./AddAppointmentModal";

const AppointmentsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // Dispara refresh na lista ao criar novo agendamento
  // Você pode tipar newAppointment conforme o tipo esperado do agendamento
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
        onCreated={handleCreated} // ESSENCIAL passar função
      />
    </>
  );
};

export default AppointmentsPage;
