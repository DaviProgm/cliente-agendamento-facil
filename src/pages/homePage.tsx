import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Calendar, LogIn } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6">
      <Calendar className="w-20 h-20 mb-6" />
      <h1 className="text-5xl font-extrabold mb-2">AgendaPro</h1>
      <p className="text-lg mb-8 max-w-md text-center opacity-90">
        Organize seus agendamentos e clientes de forma fácil e rápida.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/login")}
          size="lg"
          variant="outline"
          className="bg-white text-black hover:bg-indigo-100 font-semibold"
        >
          <LogIn className="w-5 h-5" />
          Entrar
        </Button>
        <Button
          onClick={() => navigate("/register")}
          size="lg"
          className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold"
        >
          Começar
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
