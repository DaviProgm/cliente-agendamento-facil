import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Calendar, LogIn, ThumbsUp, Users, Clock, Headphones, Shield } from "lucide-react";
import AdBanner from "../components/Adbanner";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-white  via-[#8B5CF6] to-[#A3FF12] text-white px-6 py-12">
            <div className="w-full max-w-6xl flex justify-start">
            </div>

            <div className="flex flex-col items-center text-center ">
                <div className="w-[280px] h-52 flex items-center justify-center mb-2 ">
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
                        onClick={() => navigate("/login")}
                        size="lg"
                        variant="outline"
                        className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold shadow-md"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Entrar
                    </Button>
                    <Button
                        onClick={() => navigate("/register")}
                        size="lg"
                        className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold shadow-md"
                    >
                        Começar
                    </Button>
                </div>
            </div>

            {/* Por que nos escolher */}
            <section className="w-full max-w-5xl mt-24">
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
                        <LogIn className="w-8 h-8 mb-3 text-white" />
                        <h3 className="text-xl font-semibold mb-1">Acesso Fácil</h3>
                        <p className="text-sm text-white/80">
                            Acesse de qualquer lugar com login rápido e seguro.
                        </p>
                    </div>

                    <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur h-56 flex flex-col justify-start">
                        <Shield className="w-8 h-8 mb-3 text-white" />
                        <h3 className="text-xl font-semibold mb-1">Suporte 24 horas</h3>
                        <p className="text-sm text-white/80">
                            Conte com nosso suporte técnico sempre disponível para te ajudar.
                        </p>
                    </div>
                </div>

                {/* AdBanner fora do grid */}
                <div className="mt-12 flex justify-center">
                    <AdBanner />
                </div>
            </section>

            {/* Rodapé */}
            <footer className="text-sm text-white/70 mt-24 text-center">
                © {new Date().getFullYear()} Cloktrix. Todos os direitos reservados.
            </footer>
        </div>
    );
};

export default HomePage;
