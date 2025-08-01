import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/services/clientService";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const AddClientModal = ({ isOpen, onClose, onCreated }: AddClientModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createClient(formData);

      toast({
        title: "Cliente adicionado com sucesso!",
        description: `${formData.name} foi adicionado à lista.`,
      });

      setFormData({ name: "", email: "", phone: "", address: "" });
      onClose();
      onCreated?.();
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error);
      toast({
        title: "Erro ao adicionar cliente",
        description:
          error.response?.data?.message || "Erro inesperado ao criar cliente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md rounded-2xl shadow-xl border border-[#8B5CF6]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#8B5CF6] text-xl font-bold">
            Adicionar Novo Cliente
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600">
            Preencha os dados do cliente abaixo
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nome completo"
              required
              className="border-[#8B5CF6]/40 focus-visible:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="email@exemplo.com"
              required
              className="border-[#8B5CF6]/40 focus-visible:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(11) 99999-9999"
              required
              className="border-[#8B5CF6]/40 focus-visible:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Endereço completo"
              className="border-[#8B5CF6]/40 focus-visible:ring-[#8B5CF6]"
            />
          </div>
        </form>

        <AlertDialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#8B5CF6] text-white hover:bg-[#7a4fe6]"
          >
            {isSubmitting ? "Salvando..." : "Salvar Cliente"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddClientModal;
