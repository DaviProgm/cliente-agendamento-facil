import Footer from "@/components/Footer";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-galactic-dark via-galactic-indigo to-galactic-dark text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-primary mb-8">Sobre a Workgate</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <p>
              Bem-vindo à Workgate, a sua plataforma definitiva para gerenciamento de agendamentos e clientes. Nossa missão é simplificar a vida de profissionais e empresas, oferecendo uma ferramenta intuitiva e poderosa para organizar o dia a dia e otimizar o tempo.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Nossa Missão</h2>
            <p>
              Capacitar profissionais e empresas a gerenciar seus agendamentos e clientes de forma eficiente, proporcionando mais tempo para o que realmente importa: o crescimento do seu negócio e a satisfação dos seus clientes.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Nossos Valores</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>**Eficiência:** Acreditamos que a organização é a chave para o sucesso.</li>
              <li>**Simplicidade:** Nossas ferramentas são projetadas para serem fáceis de usar, sem complicação.</li>
              <li>**Segurança:** A privacidade e a segurança dos seus dados são nossa prioridade máxima.</li>
              <li>**Inovação:** Estamos sempre buscando novas formas de melhorar e expandir nossas funcionalidades.</li>
              <li>**Suporte:** Nosso compromisso é oferecer um suporte de qualidade, sempre que você precisar.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground pt-4">Nossa História</h2>
            <p>
              A Workgate foi fundada por Davi Monteiro Barros com a visão de transformar a maneira como os profissionais gerenciam seus compromissos. Desde o início, nosso foco tem sido criar uma solução robusta, confiável e acessível para todos.
            </p>

            <p>
              Junte-se à comunidade Workgate e descubra como podemos ajudar a impulsionar o seu negócio!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
