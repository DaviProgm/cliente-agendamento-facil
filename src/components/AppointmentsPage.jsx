import { useState } from "react";
import AppointmentList from "./AppointmentList";
import CreateAppointmentModal from "./CreateAppointmentModal"; // modal criação que você já tem

const AppointmentsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // Dispara refresh na lista ao criar novo agendamento
  const handleCreated = (newAppointment) => {
    setIsCreateModalOpen(false);
    setRefreshFlag(prev => !prev);
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
