import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="bg-gradient-to-br from-galactic-dark via-galactic-indigo to-galactic-dark text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-primary mb-8">Termos e Serviços</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <p>Última atualização: 16 de setembro de 2025</p>

            <p>
              Bem-vindo ao Cloktrix! Estes termos e condições descrevem as regras e regulamentos para o uso do nosso software, localizado em [URL do seu site]. Ao acessar este software, presumimos que você aceita estes termos e condições. Não continue a usar o Cloktrix se não concordar com todos os termos e condições declarados nesta página.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">1. Uso da Licença</h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Cloktrix, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título, e sob esta licença você não pode:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Cloktrix;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground pt-4">2. Isenção de Responsabilidade</h2>
            <p>
              Os materiais no site da Cloktrix são fornecidos 'como estão'. A Cloktrix não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">3. Limitações</h2>
            <p>
              Em nenhum caso a Cloktrix ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Cloktrix, mesmo que a Cloktrix ou um representante autorizado da Cloktrix tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">4. Precisão dos Materiais</h2>
            <p>
              Os materiais exibidos no site da Cloktrix podem incluir erros técnicos, tipográficos ou fotográficos. A Cloktrix não garante que qualquer material em seu site seja preciso, completo ou atual. A Cloktrix pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, a Cloktrix não se compromete a atualizar os materiais.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">5. Links</h2>
            <p>
              A Cloktrix não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por parte da Cloktrix do site. O uso de qualquer site vinculado é por conta e risco do usuário.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Modificações</h2>
            <p>
              A Cloktrix pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual destes termos de serviço.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
