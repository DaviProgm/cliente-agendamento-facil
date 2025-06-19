import { useState, useEffect } from "react";
import api from "../instance/api.js";
import { toast } from "sonner";

type AddAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditAppointmentModal = ({ isOpen, onClose }: AddAppointmentModalProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        clientName: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/agendamentos", {
        name: formData.clientName,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        observations: formData.notes,
      });

      toast.success("Agendamento criado com sucesso!");
      onClose(); 
    } catch (error: any) {
      console.error("Erro ao criar agendamento:", error.response?.data || error.message);
      toast.error("Erro ao criar agendamento. Verifique os dados e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Novo Agendamento</h2>
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
            value={formData.clientName}
            onChange={(e) =>
              setFormData({ ...formData, clientName: e.target.value })
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
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {isSubmitting ? "Salvando..." : "Salvar Agendamento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
