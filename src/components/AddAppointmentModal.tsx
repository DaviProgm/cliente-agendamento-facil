import React, { useState } from "react";
import api from "../instance/api"; // axios configurado
import { toast } from "sonner";

const AddAppointmentModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    date: "",
    time: "",
    observations: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/agendamentos", formData);
      toast.success("Agendamento criado com sucesso!");

      if (typeof onCreated === "function") {
        onCreated(response.data);
      }

      setFormData({
        name: "",
        service: "",
        date: "",
        time: "",
        observations: "",
      });

      onClose();
    } catch (error) {
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
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do Cliente"
            required
            className="w-full border rounded px-3 py-2"
          />
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
