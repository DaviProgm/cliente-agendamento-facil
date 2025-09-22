import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateService } from "@/services/serviceService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";

// Service type - can be moved to a shared types file
interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
}

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const serviceSchema = z.object({
  name: z.string().min(1, "O nome do serviço é obrigatório."),
  duration: z.coerce.number().int().positive("A duração deve ser um número positivo de minutos."),
  price: z.string().refine(value => !isNaN(parseFloat(value.replace(',', '.'))), {
    message: "O preço deve ser um número válido.",
  }),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const EditServiceModal = ({ isOpen, onClose, service }: EditServiceModalProps) => {
  const queryClient = useQueryClient();

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    if (service) {
      form.reset({
        name: service.name,
        duration: service.duration,
        price: service.price.toString().replace('.', ','),
      });
    }
  }, [service, form]);

  const mutation = useMutation({
    mutationFn: (data: ServiceFormData) => {
      if (!service) throw new Error("Serviço não selecionado.");
      return updateService(service.id, { ...data, price: data.price.replace(',', '.') });
    },
    onSuccess: () => {
      toast.success("Serviço atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      onClose();
    },
    onError: (error) => {
      toast.error("Erro ao atualizar serviço.", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Serviço</DialogTitle>
          <DialogDescription>
            Atualize os detalhes do seu serviço.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Serviço</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração (em minutos)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceModal;
