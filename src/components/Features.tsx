import { Calendar, Users, ThumbsUp, Clock, Shield, Headphones } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="w-full max-w-5xl mx-auto mt-24">
      <h2 className="text-4xl font-bold text-center mb-12">Por que nos escolher?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
          <Calendar className="w-8 h-8 mb-3 text-white" />
          <h3 className="text-xl font-semibold mb-1">Gestão de Agendamentos</h3>
          <p className="text-sm text-white/80">
            Agende, reagende e visualize compromissos com facilidade e agilidade.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
          <Users className="w-8 h-8 mb-3 text-white" />
          <h3 className="text-xl font-semibold mb-1">Controle de Clientes</h3>
          <p className="text-sm text-white/80">
            Mantenha informações dos seus clientes organizadas e acessíveis.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
          <ThumbsUp className="w-8 h-8 mb-3 text-white" />
          <h3 className="text-xl font-semibold mb-1">Totalmente Gratuito</h3>
          <p className="text-sm text-white/80">
            Utilize todas as funcionalidades sem pagar nada. Sem pegadinhas.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
          <Clock className="w-8 h-8 mb-3 text-white" />
          <h3 className="text-xl font-semibold mb-1">Economize Tempo</h3>
          <p className="text-sm text-white/80">
            Automatize sua rotina e reduza o tempo com tarefas manuais.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
          <Shield className="w-8 h-8 mb-3 text-white" />
          <h3 className="text-xl font-semibold mb-1">Segurança de Dados</h3>
          <p className="text-sm text-white/80">
            Seus dados são protegidos com criptografia de ponta a ponta.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
          <Headphones className="w-8 h-8 mb-3 text-white" />
          <h3 className="text-xl font-semibold mb-1">Suporte 24 horas</h3>
          <p className="text-sm text-white/80">
            Conte com nosso suporte técnico sempre disponível para te ajudar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;