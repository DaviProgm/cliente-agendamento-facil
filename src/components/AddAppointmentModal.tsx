
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAppointmentModal = ({ isOpen, onClose }: AddAppointmentModalProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio para backend - aqui você integrará com sua API
    setTimeout(() => {
      console.log("Dados do agendamento para enviar ao backend:", formData);
      
      toast({
        title: "Agendamento criado com sucesso!",
        description: `Agendamento para ${formData.clientName} foi criado.`,
      });

      // Resetar formulário
      setFormData({
        clientName: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Novo Agendamento</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha as informações do agendamento abaixo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Cliente *</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => handleInputChange("clientName", e.target.value)}
              placeholder="Nome do cliente"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">Serviço *</Label>
            <Input
              id="service"
              value={formData.service}
              onChange={(e) => handleInputChange("service", e.target.value)}
              placeholder="Tipo de serviço"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Informações adicionais"
              rows={3}
            />
          </div>
        </form>

        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Criar Agendamento"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddAppointmentModal;
