
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">AgendaPro</h1>
        <p className="text-xl text-gray-600 mb-8">Sistema de Gerenciamento de Clientes e Agendamentos</p>
        <Button 
          onClick={() => navigate("/login")}
          size="lg"
          className="px-8 py-3"
        >
          Acessar Painel
        </Button>
      </div>
    </div>
  );
};

export default Index;
