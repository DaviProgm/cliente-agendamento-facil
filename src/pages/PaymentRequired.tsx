import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Footer from "@/components/Footer";

const PaymentRequired = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-primary mb-4">Acesso Negado</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sua assinatura está pendente ou inativa. Por favor, finalize o pagamento para acessar todas as funcionalidades do sistema.
          </p>
          <Button onClick={() => { console.log("Navigating from PaymentRequired to:", "/subscription-selection"); navigate("/subscription-selection"); }} variant="default" size="lg">
            Gerenciar Assinatura
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentRequired;
