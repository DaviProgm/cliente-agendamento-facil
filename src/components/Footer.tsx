const Footer = () => {
  return (
    <footer className="w-full max-w-6xl mx-auto text-sm text-foreground/70 mt-24 text-center p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Workgate. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href="/termos" className="hover:text-primary hover:underline">
            Termos e Serviços
          </a>
          <a href="/politica-de-privacidade" className="hover:text-primary hover:underline">
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;