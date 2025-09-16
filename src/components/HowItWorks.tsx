const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full max-w-5xl mx-auto mt-24">
      <h2 className="text-4xl font-bold text-center mb-12">Como Funciona?</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary/20 p-4 rounded-full mb-4">
            <span className="text-3xl font-bold text-foreground">1</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Escolha seu Plano</h3>
          <p className="text-sm text-foreground/80 max-w-xs">
            Selecione o plano que melhor se adapta às suas necessidades.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary/20 p-4 rounded-full mb-4">
            <span className="text-3xl font-bold text-foreground">2</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Cadastre-se</h3>
          <p className="text-sm text-foreground/80 max-w-xs">
            Crie sua conta em poucos segundos para começar.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary/20 p-4 rounded-full mb-4">
            <span className="text-3xl font-bold text-foreground">3</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Adicione Clientes</h3>
          <p className="text-sm text-foreground/80 max-w-xs">
            Importe sua lista de clientes ou adicione novos facilmente.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary/20 p-4 rounded-full mb-4">
            <span className="text-3xl font-bold text-foreground">4</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Comece a Agendar</h3>
          <p className="text-sm text-foreground/80 max-w-xs">
            Gerencie seus agendamentos de forma simples e intuitiva.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;