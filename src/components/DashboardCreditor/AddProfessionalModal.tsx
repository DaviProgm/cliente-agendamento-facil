
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
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { createProfessional, uploadProfilePicture } from "@/services/userService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  foto_perfil_url: z.string().optional(),
});

interface Professional {
  id: string;
  name: string;
  email: string;
  foto_perfil_url?: string;
}

interface AddProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (professional: Professional) => void;
}

const AddProfessionalModal = ({ isOpen, onClose, onSave }: AddProfessionalModalProps) => {
  const [foto_perfil_url, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    reset();
    setAvatarUrl(null);
  }, [isOpen, reset]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadProfilePicture(file);
        setAvatarUrl(response.foto_perfil_url);
        setValue("foto_perfil_url", response.foto_perfil_url);
      } catch (error) {
        toast({ title: "Erro no upload da imagem", variant: "destructive" });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const savedProfessional = await createProfessional(data);
      toast({ title: "Profissional adicionado com sucesso!" });
      onSave(savedProfessional);
      onClose();
    } catch (error) {
      toast({ title: "Erro ao adicionar profissional", variant: "destructive" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Profissional</DialogTitle>
          <DialogDescription>Preencha os dados do novo profissional.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={foto_perfil_url || undefined} />
              <AvatarFallback>Foto</AvatarFallback>
            </Avatar>
            <Input id="picture" type="file" onChange={handleFileChange} disabled={isUploading} />
          </div>

          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfessionalModal;
