
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { createUnit, updateUnit } from "@/services/unitService";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  address: z.string().optional(),
});

interface Unit {
  id: string;
  name: string;
  address?: string;
}

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (unit: Unit) => void;
  unit?: Unit | null;
}

const AddUnitModal = ({ isOpen, onClose, onSave, unit }: AddUnitModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  useEffect(() => {
    if (unit) {
      reset({ name: unit.name, address: unit.address || "" });
    } else {
      reset({ name: "", address: "" });
    }
  }, [unit, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const savedUnit = unit
        ? await updateUnit(unit.id, data)
        : await createUnit(data);
      
      toast({
        title: `Unidade ${unit ? 'atualizada' : 'criada'} com sucesso!`,
      });
      onSave(savedUnit);
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao salvar unidade",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{unit ? "Editar Unidade" : "Adicionar Nova Unidade"}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da unidade.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Unidade</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="address">Endereço (Opcional)</Label>
            <Input id="address" {...register("address")} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnitModal;
