import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detalhes do Cliente</AlertDialogTitle>
          <AlertDialogDescription>
            Informações completas de {client.name}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 space-y-3 text-sm text-foreground">
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Nome:</span>
            <span>{client.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Email:</span>
            <span>{client.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Telefone:</span>
            <span>{client.phone}</span>
          </div>
          {client.address && (
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Endereço:</span>
              <span className="text-right">{client.address}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">Status:</span>
            <Badge variant={client.status === "ativo" ? "secondary" : "destructive"}>
              {client.status}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Último agendamento:</span>
            <span>
              {client.lastAppointment
                ? new Date(client.lastAppointment).toLocaleDateString("pt-BR")
                : "Nenhum"}
            </span>
          </div>
        </div>

        <AlertDialogFooter className="mt-4">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClientDetailsModal;
