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
  lastAppointment?: string | null;  // agora opcional e aceita null
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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Detalhes do Cliente</AlertDialogTitle>
          <AlertDialogDescription>
            Informações completas do cliente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="px-6 py-4">
          <p><strong>Nome:</strong> {client.name}</p>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Telefone:</strong> {client.phone}</p>
          {client.address && <p><strong>Endereço:</strong> {client.address}</p>}
          <p><strong>Status:</strong> {client.status}</p>
          <p>
            <strong>Último agendamento:</strong>{" "}
            {client.lastAppointment
              ? new Date(client.lastAppointment).toLocaleDateString("pt-BR")
              : "Nenhum"}
          </p>
        </div>
        <AlertDialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClientDetailsModal;
