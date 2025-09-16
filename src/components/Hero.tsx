import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center my-20">
      <div className="w-[280px] h-52 flex items-center justify-center mb-2">
        <img src="/logo.png" alt="Logo Cloktrix" className="h-full object-contain" />
      </div>
      <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-md mb-0 mt-[-4rem]">
        CLOKTRIX
      </h1>
      <p className="text-xl mt-4 mb-10 max-w-xl text-foreground/90">
       A melhor agenda para organizar seus agendamentos e clientes com facilidade e eficiência.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          size="lg"
          variant="default"
          className="font-semibold shadow-md"
        >
          Ver Planos
        </Button>
      </div>
    </div>
  );
};

export default Hero;