import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: "ativo" | "inativo";
  lastAppointment?: string | null;
}

interface ClientDetailsModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClientDetailsModal = ({ client, isOpen, onClose }: ClientDetailsModalProps) => {
  if (!client) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md rounded-2xl border border-[#8B5CF6]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#8B5CF6] text-lg font-bold">
            Detalhes do Cliente
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600">
            Informações completas e atualizadas do cliente selecionado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 space-y-3 text-sm text-gray-800 px-1">
          <div>
            <span className="font-medium text-[#8B5CF6]">Nome:</span>{" "}
            {client.name}
          </div>
          <div>
            <span className="font-medium text-[#8B5CF6]">Email:</span>{" "}
            {client.email}
          </div>
          <div>
            <span className="font-medium text-[#8B5CF6]">Telefone:</span>{" "}
            {client.phone}
          </div>
          {client.address && (
            <div>
              <span className="font-medium text-[#8B5CF6]">Endereço:</span>{" "}
              {client.address}
            </div>
          )}
          <div>
            <span className="font-medium text-[#8B5CF6]">Status:</span>{" "}
            <span
              className={`font-semibold ${
                client.status === "ativo" ? "text-green-600" : "text-red-500"
              }`}
            >
              {client.status}
            </span>
          </div>
          <div>
            <span className="font-medium text-[#8B5CF6]">Último agendamento:</span>{" "}
            {client.lastAppointment
              ? new Date(client.lastAppointment).toLocaleDateString("pt-BR")
              : "Nenhum"}
          </div>
        </div>

        <AlertDialogFooter className="mt-4">
          <Button onClick={onClose} className="bg-[#8B5CF6] text-white hover:bg-[#7a4fe6]">
            Fechar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClientDetailsModal;
