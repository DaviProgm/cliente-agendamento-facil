import { Users, Star, CheckCircle } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Encontre o{' '}
          <span className="bg-gradient-primary bg-clip-text ">
            Profissional
          </span>{' '}
          Perfeito
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
          Conecte-se com milhares de especialistas verificados e transforme suas ideias em realidade
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">10,000+</p>
              <p className="text-muted-foreground">Profissionais</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-accent-blue to-accent-purple rounded-full">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">4.9/5</p>
              <p className="text-muted-foreground">Avaliação Média</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-success to-warning rounded-full">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">50,000+</p>
              <p className="text-muted-foreground">Projetos Concluídos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};