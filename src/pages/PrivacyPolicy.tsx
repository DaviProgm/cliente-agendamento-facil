import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-galactic-dark via-galactic-indigo to-galactic-dark text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-primary mb-8">Política de Privacidade</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <p>Última atualização: 16 de setembro de 2025</p>

            <p>
              A sua privacidade é importante para nós. É política do Cloktrix respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no nosso software.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">1. Informações que coletamos</h2>
            <p>
              Coletamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
            <p>
              As informações que coletamos incluem, mas não se limitam a, seu nome, endereço de e-mail e informações de pagamento, que são necessárias para a criação de sua conta e processamento de assinaturas.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">2. Como usamos suas informações</h2>
            <p>
              Usamos as informações que coletamos de várias maneiras, incluindo para:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Prover, operar e manter nosso software</li>
              <li>Melhorar, personalizar e expandir nosso software</li>
              <li>Entender e analisar como você usa nosso software</li>
              <li>Desenvolver novos produtos, serviços, recursos e funcionalidades</li>
              <li>Comunicar com você, diretamente ou através de um de nossos parceiros, incluindo para atendimento ao cliente, para lhe fornecer atualizações e outras informações relacionadas ao software e para fins de marketing e promocionais</li>
              <li>Processar suas transações</li>
              <li>Enviar e-mails para você</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground pt-4">3. Segurança</h2>
            <p>
              A segurança de suas informações pessoais é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança absoluta.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">4. Cookies</h2>
            <p>
              Usamos cookies para manter sua sessão e preferências. Um cookie é um pequeno arquivo de texto que é armazenado em seu computador para fins de manutenção de registros. Você pode remover os cookies seguindo as instruções fornecidas no arquivo de "ajuda" do seu navegador da Internet.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Alterações a esta Política de Privacidade</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade de tempos em tempos. Aconselhamos que você revise esta página periodicamente para quaisquer alterações. Iremos notificá-lo de quaisquer alterações, publicando a nova Política de Privacidade nesta página.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
