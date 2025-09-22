import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile, getUserProfile } from "@/services/userService";
import { Copy } from "lucide-react";
import { useEffect } from "react";

const profileSchema = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres.").optional(),
  bio: z.string().max(500, "A biografia não pode ter mais de 500 caracteres.").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data: profileData, isLoading } = useQuery({ queryKey: ['profile'], queryFn: getUserProfile });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        username: profileData.username || "",
        bio: profileData.bio || "",
      });
    }
  }, [profileData, form]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar perfil.", {
        description: error.message,
      });
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/agendar/${profileData?.username}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência!");
  };

  if (isLoading) return <div>Carregando perfil...</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
      <div className="mb-6 p-4 border rounded-lg bg-card">
        <label className="text-sm font-medium">Seu Link Público</label>
        <div className="flex items-center gap-2 mt-2">
          <Input readOnly value={`${window.location.origin}/agendar/${profileData?.username}`} />
          <Button variant="outline" onClick={handleCopyLink}><Copy className="h-4 w-4" /></Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="seu-nome-de-usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografia</FormLabel>
                <FormControl>
                  <Textarea placeholder="Fale um pouco sobre você..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePage;