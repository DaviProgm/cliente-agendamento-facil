// src/components/AddAppointmentModal.tsx
import React, { useState, useEffect } from "react";
import api from "../instance/api"; // axios configurado
import { toast } from "sonner";

const AddAppointmentModal = ({ isOpen, onClose, onCreated }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "clientId" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.clientId) {
      toast.error("Selecione um cliente para o agendamento.");
      return;
    }

    setIsSubmitting(true);
    console.log("Enviando ao backend:", formData);

    try {
      const response = await api.post("/agendamentos", formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Agendamento criado com sucesso!");

      // Passa apenas o schedule para onCreated
      onCreated?.(response.data.schedule);

      setFormData({ clientId: 0, service: "", date: "", time: "", observations: "" });
      onClose();
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.message);
      toast.error(
        "Erro ao criar agendamento: " +
        (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Criar Agendamento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value={0} disabled>Selecione um cliente</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          <input
            name="service"
            value={formData.service}
            onChange={handleChange}
            placeholder="Serviço"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            placeholder="Observações"
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
