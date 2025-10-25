
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getProfessionals } from "@/services/userService";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Professional {
  id: string;
  name: string;
  username: string; // Needed for the URL
  bio?: string;
  foto_perfil_url?: string;
}

const ProfessionalsPublicPage = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const data = await getProfessionals();
        setProfessionals(data);
      } catch (error) {
        toast({ title: "Erro ao carregar profissionais", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Nossos Profissionais</h1>
        <p className="text-muted-foreground mt-2">Escolha um profissional para iniciar o agendamento.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {professionals.map((prof) => (
          <Link to={`/agendar/${prof.username}`} key={prof.id} className="group">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 border-2 border-transparent group-hover:border-primary transition-colors">
                  <AvatarImage src={prof.foto_perfil_url} />
                  <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-lg">{prof.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 truncate">{prof.bio || "Especialista"}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalsPublicPage;
