import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/instance/api";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await api.get('/subscription');
        if (response.data.subscription.status === 'ativo') {
          toast.success("Assinatura ativada! Redirecionando para o dashboard.");
          navigate("/dashboard");
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar status da assinatura:", error);
        toast.error("Não foi possível verificar o status da assinatura.");
      }

      // Fallback: Redireciona para o dashboard após alguns segundos
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000); // Redireciona após 3 segundos

      return () => clearTimeout(timer);
    };

    checkSubscriptionStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-galactic-dark via-galactic-indigo to-galactic-dark text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Pagamento Confirmado!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sua assinatura foi ativada com sucesso. Você será redirecionado para o dashboard em breve.
          </p>
          <Button onClick={() => navigate("/dashboard")} variant="default" size="lg">
            Ir para o Dashboard
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
