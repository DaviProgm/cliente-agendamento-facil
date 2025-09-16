import { Calendar, Users, Clock, Shield, Headphones, Globe } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="w-full max-w-5xl mx-auto mt-24">
      <h2 className="text-4xl font-bold text-center mb-12">Por que nos escolher?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-secondary/20 p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg mb-4 inline-block self-start">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Gestão de Agendamentos</h3>
          <p className="text-sm text-foreground/80">
            Agende, reagende e visualize compromissos com facilidade e agilidade.
          </p>
        </div>
        <div className="bg-secondary/20 p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg mb-4 inline-block self-start">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Controle de Clientes</h3>
          <p className="text-sm text-foreground/80">
            Mantenha informações dos seus clientes organizadas e acessíveis.
          </p>
        </div>
        <div className="bg-secondary/20 p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg mb-4 inline-block self-start">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Economize Tempo</h3>
          <p className="text-sm text-foreground/80">
            Automatize sua rotina e reduza o tempo com tarefas manuais.
          </p>
        </div>
        <div className="bg-secondary/20 p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg mb-4 inline-block self-start">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Segurança de Dados</h3>
          <p className="text-sm text-foreground/80">
            Seus dados são protegidos com criptografia de ponta a ponta.
          </p>
        </div>
        <div className="bg-secondary/20 p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg mb-4 inline-block self-start">
            <Headphones className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Suporte 24 horas</h3>
          <p className="text-sm text-foreground/80">
            Conte com nosso suporte técnico sempre disponível para te ajudar.
          </p>
        </div>
        <div className="bg-secondary/20 p-6 rounded-2xl shadow-lg backdrop-blur flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg mb-4 inline-block self-start">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Acesso de Qualquer Lugar</h3>
          <p className="text-sm text-foreground/80">
            Acesse sua agenda do celular, tablet ou computador.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;