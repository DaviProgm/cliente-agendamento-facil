import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "@/services/serviceService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Service {
  id: number;
  name: string;
}

interface DeleteServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const DeleteServiceDialog = ({ isOpen, onClose, service }: DeleteServiceDialogProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      if (!service) throw new Error("Serviço não selecionado.");
      return deleteService(service.id);
    },
    onSuccess: () => {
      toast.success(`Serviço "${service?.name}" deletado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      onClose();
    },
    onError: (error) => {
      toast.error("Erro ao deletar serviço.", {
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso irá deletar permanentemente o serviço
            <strong> "{service?.name}"</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete} disabled={mutation.isPending}>
              {mutation.isPending ? "Deletando..." : "Deletar"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServiceDialog;
