import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import Footer from "@/components/Footer";
import api from "@/instance/api";
import { toast } from "react-toastify";
import { useLoading } from "@/contexts/LoadingContext";

const SubscriptionSelection = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSubscribe = async (plan: 'basic' | 'pro') => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('ID do usuário não encontrado. Por favor, faça login novamente.');
        navigate("/login");
        return;
      }

      const response = await api.post('/subscriptions', { userId: Number(userId), plan });

      // Redirecionamento imediato para a URL de pagamento do Asaas
      if (response.data.paymentInfo && response.data.paymentInfo.invoiceUrl) {
        window.location.href = response.data.paymentInfo.invoiceUrl;
        return; // Para a execução aqui para garantir que o redirecionamento ocorra sem interferência
      } else {
        toast.error('Não foi possível obter a URL de pagamento. Tente novamente.');
      }

    } catch (error: any) {
      console.error('Erro ao criar assinatura:', error);
      toast.error(error.response?.data?.message || 'Não foi possível processar sua assinatura.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-galactic-dark via-galactic-indigo to-galactic-dark text-foreground flex flex-col">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center p-4 text-foreground">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo Workgate" className="h-[70px] w-auto" />
          <span className="text-2xl font-bold ml-2">WORKGATE</span>
        </div>
        <Button
          onClick={handleLogout}
          variant="secondary"
          className="font-semibold shadow-md"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair
        </Button>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Escolha o plano ideal para você</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plano Básico */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Plano Básico</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold">R$ 29,99<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
                <ul className="list-disc list-inside mt-6 space-y-2">
                  <li>Agendamentos ilimitados</li>
                  <li>Cadastro de clientes</li>
                  <li>Suporte por e-mail</li>
                </ul>
              </CardContent>
              <CardFooter className="p-4">
                <Button onClick={() => handleSubscribe('basic')} className="w-full" variant="secondary">Assinar Básico</Button>
              </CardFooter>
            </Card>
            {/* Plano Pro */}
            <Card className="border-primary border-2 relative flex flex-col">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">Mais Popular</Badge>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Plano Pro</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold">R$ 49,99<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
                <ul className="list-disc list-inside mt-6 space-y-2">
                  <li>Todos os benefícios do Plano Básico</li>
                  <li>Relatórios avançados</li>
                  <li>Suporte prioritário</li>
                </ul>
              </CardContent>
              <CardFooter className="p-4">
                <Button onClick={() => handleSubscribe('pro')} className="w-full" variant="default">Assinar Pro</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionSelection;
