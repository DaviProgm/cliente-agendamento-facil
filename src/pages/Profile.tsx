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
import { updateUserProfile, getUserProfile, uploadProfilePicture } from "@/services/userService";
import { Copy, Loader2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres.").optional(),
  bio: z.string().max(500, "A biografia não pode ter mais de 500 caracteres.").optional(),
  cor_perfil: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      bio: "",
      cor_perfil: "#FFFFFF",
    },
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        username: profileData.username || "",
        bio: profileData.bio || "",
        cor_perfil: profileData.cor_perfil || "#FFFFFF",
      });
    }
  }, [profileData, form]);

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar perfil.", {
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: () => {
      toast.success("Foto de perfil atualizada!");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setSelectedFile(null);
      setPreviewUrl(null);
    },
    onError: (error: any) => {
      toast.error("Erro ao enviar foto.", {
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoSave = () => {
    if (selectedFile) {
      uploadPhotoMutation.mutate(selectedFile);
    } else {
      toast.error("Nenhum arquivo selecionado.");
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/agendar/${profileData?.username}`;
    navigator.clipboard.writeText(link);
    toast.success("Link público copiado!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
          <CardDescription>Atualize suas informações de perfil, foto e aparência da página.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 flex flex-col items-center gap-4 pt-4">
                  <Avatar className="h-32 w-32 border-2 border-primary">
                    <AvatarImage src={previewUrl || profileData?.foto_perfil_url} alt="Foto de Perfil" />
                    <AvatarFallback className="text-4xl">
                      {profileData?.username ? getInitials(profileData.username) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <Button variant="outline" type="button" onClick={handleUploadClick} disabled={uploadPhotoMutation.isPending}>
                    <Upload className="mr-2 h-4 w-4" />
                    Trocar Foto
                  </Button>
                  {selectedFile && (
                    <Button type="button" onClick={handlePhotoSave} disabled={!selectedFile || uploadPhotoMutation.isPending}>
                      {uploadPhotoMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
                      ) : (
                        "Salvar Foto"
                      )}
                    </Button>
                  )}
                </div>

                <div className="md:col-span-2 space-y-6">
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
                          <Textarea rows={4} placeholder="Fale um pouco sobre seu trabalho..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="cor_perfil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor de Fundo da Página Pública</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4 pt-2">
                        <Input
                          type="color"
                          {...field}
                          className="h-10 w-14 cursor-pointer p-1"
                        />
                        <Input
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="#FFFFFF"
                          className="w-32"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando Perfil...</>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 border-t pt-6">
          <label className="text-sm font-medium">Seu Link Público para Agendamentos</label>
          <div className="flex items-center gap-2 w-full">
            <Input readOnly value={`${window.location.origin}/agendar/${profileData?.username}`} />
            <Button variant="outline" size="icon" onClick={handleCopyLink}><Copy className="h-4 w-4" /></Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
