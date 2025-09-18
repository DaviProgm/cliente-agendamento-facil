import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-20">
      {/* Left Column: Text Content */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <img
          src="/logo.png"
          alt="Logo Workgate"
          className="h-[250px] md:h-[80px] object-contain mb-4 lg:hidden"
        />

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Organize seu tempo, <br className="hidden md:inline" />maximize seus resultados.
        </h1>
        <p className="text-lg md:text-xl max-w-xl mb-8 text-foreground/90">
          A Workgate é a solução completa para gerenciar seus agendamentos e clientes de forma inteligente e eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            variant="default"
            className="font-semibold shadow-md"
          >
            Ver Planos
          </Button>
          <Button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            variant="outline"
            className="font-semibold shadow-md"
          >
            Saiba Mais
          </Button>
        </div>
      </div>

      {/* Right Column: Dashboard Screenshots */}
      <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
        {/* Desktop Screenshot */}
        <img
          src="/modelo.png"
          alt="Dashboard Workgate Desktop"
          className="hidden md:block w-full max-w-xl rounded-lg shadow-xl  border-border"
        />
        {/* Mobile Screenshot (Optional, positioned over desktop or separately) */}


      </div>
    </div>
  );
};

export default Hero;
