import { useState, useEffect } from "react";
import api from "../instance/api";
import { toast } from "sonner";

const EditAppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    date: "",
    time: "",
    observations: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (appointment) {
      const { name, service, date, time, observations } = appointment;

      setFormData({
        name: name || "",
        service: service || "",
        date: date?.split("T")[0] || "", // força formato YYYY-MM-DD
        time: time || "",
        observations: observations || "",
      });
    } else {
      setFormData({
        name: "",
        service: "",
        date: "",
        time: "",
        observations: "",
      });
    }
  }, [appointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointment || !appointment.id) {
      toast.error("Agendamento inválido para atualização.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      service: formData.service.trim(),
      date: formData.date,
      time: formData.time,
      observations: formData.observations.trim(),
    };

    try {
      console.log("Atualizando agendamento ID:", appointment.id, payload);
      await api.put(`/agendamentos/${appointment.id}`, payload);

      toast.success("Agendamento atualizado com sucesso!");
      if (typeof onUpdated === "function") onUpdated();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error.response?.data || error.message);
      toast.error("Erro ao atualizar agendamento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Editar Agendamento</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-sm text-red-500"
          >
            Fechar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do cliente"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Serviço"
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            placeholder="Observações"
            value={formData.observations}
            onChange={(e) =>
              setFormData({ ...formData, observations: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {isSubmitting ? "Atualizando..." : "Atualizar Agendamento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
