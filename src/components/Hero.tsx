import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center my-20">
      <div className="w-[280px] h-52 flex items-center justify-center mb-2">
        <img src="/logo.png" alt="Logo Cloktrix" className="h-full object-contain" />
      </div>
      <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-md mb-0 mt-[-4rem]">
        CLOKTRIX
      </h1>
      <p className="text-xl mt-4 mb-10 max-w-xl text-white/90">
        Agenda gratuita para organizar seus agendamentos e clientes com facilidade e eficiência.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/register")}
          size="lg"
          className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold shadow-md"
        >
          Começar
        </Button>
      </div>
    </div>
  );
};

export default Hero;