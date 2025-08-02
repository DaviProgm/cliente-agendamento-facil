import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full max-w-6xl mx-auto flex justify-between items-center p-4 bg-transparent text-white">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo Cloktrix" className="h-10 w-auto" />
        <span className="text-2xl font-bold ml-2">CLOKTRIX</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#features" className="hover:underline">Features</a>
        <a href="#how-it-works" className="hover:underline">How it Works</a>
        <a href="#testimonials" className="hover:underline">Testimonials</a>
      </nav>
      <Button
        onClick={() => navigate("/login")}
        variant="outline"
        className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold shadow-md"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Entrar
      </Button>
    </header>
  );
};

export default Header;