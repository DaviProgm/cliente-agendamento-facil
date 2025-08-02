const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full max-w-5xl mx-auto mt-24">
      <h2 className="text-4xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur">
          <p className="text-white/80 mb-4">
            "O Cloktrix transformou a maneira como eu gerencio meus agendamentos. É simples, intuitivo e me economiza muito tempo."
          </p>
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold text-white">João Silva</p>
              <p className="text-sm text-white/80">Cabeleireiro</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur">
          <p className="text-white/80 mb-4">
            "Finalmente uma ferramenta que entende as necessidades do meu negócio. O controle de clientes é fantástico!"
          </p>
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold text-white">Maria Oliveira</p>
              <p className="text-sm text-white/80">Manicure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;