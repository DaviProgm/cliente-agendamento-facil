import { useState, useEffect } from "react";
import api from "../../instance/api";
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
        date: date?.split("T")[0] || "",
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

    if (!appointment?.id) {
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
      await api.put(`/agendamentos/${appointment.id}`, payload);
      toast.success("Agendamento atualizado com sucesso!");
      onUpdated?.();
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-lg transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#8B5CF6]">Editar Agendamento</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-sm text-red-500 hover:underline"
          >
            Fechar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do cliente"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-[#8B5CF6]/30 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] rounded px-3 py-2 transition"
          />

          <input
            type="text"
            placeholder="Serviço"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            required
            className="w-full border border-[#8B5CF6]/30 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] rounded px-3 py-2 transition"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full border border-[#8B5CF6]/30 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] rounded px-3 py-2 transition"
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="w-full border border-[#8B5CF6]/30 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] rounded px-3 py-2 transition"
          />

          <textarea
            placeholder="Observações"
            value={formData.observations}
            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
            className="w-full border border-[#8B5CF6]/30 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6] rounded px-3 py-2 transition resize-none"
            rows={3}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-[#8B5CF6] border border-[#8B5CF6] hover:bg-gray-100 py-2 rounded font-medium transition"
          >
            {isSubmitting ? "Atualizando..." : "Atualizar Agendamento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
