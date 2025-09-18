import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className={`w-full max-w-6xl mx-auto flex justify-between items-center p-4 text-foreground transition-all duration-300 sticky top-0 z-40`}
    >
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo Workgate" className="h-[100px] w-auto ml-[-15px]" />
        <span className="text-2xl font-bold ml-[-15px]">WORKGATE</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <a href="#features" className="hover:underline">benefícios</a>
        <a href="#how-it-works" className="hover:underline">Como funciona</a>
        <a href="#testimonials" className="hover:underline">Clientes</a>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>Navegação</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <a href="#features" className="text-lg hover:underline">benefícios</a>
              <a href="#how-it-works" className="text-lg hover:underline">Como funciona</a>
              <a href="#testimonials" className="text-lg hover:underline">Clientes</a>
              <Button
                onClick={() => navigate("/login")}
                variant="secondary"
                className="font-semibold shadow-md mt-4 bg-black"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Entrar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="default"
                className="font-semibold shadow-md mt-2"
              >
                Começar agora
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Login and Register Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          className="font-semibold shadow-md"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Entrar
        </Button>
        <Button
          onClick={() => navigate("/register")}
          variant="default"
          className="font-semibold shadow-md"
        >
          Começar agora
        </Button>
      </div>
    </header>
  );
};

export default Header;
