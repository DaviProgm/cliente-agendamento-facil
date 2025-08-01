import React, { useState, useEffect } from "react";
import api from "../../instance/api";
import { toast } from "sonner";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (appointment: any) => void;
}

const AddAppointmentModal = ({ isOpen, onClose, onCreated }: AddAppointmentModalProps) => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: 0,
    service: "",
    date: "",
    time: "",
    observations: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.get("/clientes")
        .then((res) => setClients(res.data))
        .catch(() => setClients([]));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "clientId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientId) {
      toast.error("Selecione um cliente.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/agendamentos", formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Agendamento criado com sucesso!");
      onCreated?.(response.data.schedule);
      setFormData({ clientId: 0, service: "", date: "", time: "", observations: "" });
      onClose();
    } catch (error: any) {
      toast.error(
        "Erro ao criar agendamento: " +
        (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-[#8B5CF6] p-6">
        <h2 className="text-xl font-semibold text-[#8B5CF6] mb-4">Novo Agendamento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Cliente *
            </label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            >
              <option value={0} disabled>Selecione um cliente</option>
              {clients.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Serviço *
            </label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              placeholder="Ex: Consulta, Corte, Reunião"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Data *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Hora *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Observações
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Ex: Levar documentos, preferir horários pela manhã..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#8B5CF6] hover:bg-[#7a4fe6] text-white py-2 rounded-lg transition-all"
            >
              {isSubmitting ? "Salvando..." : "Salvar Agendamento"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
