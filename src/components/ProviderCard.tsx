import { useState } from "react";
import { Star, MapPin, Clock, Badge, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProviderModal } from "./ProviderModal";

export interface Provider {
  id: string;
  name: string;
  profession: string;
  reviewCount: number;
  location: string;
  responseTime: string;
  verified: boolean;
  price: string;
  tags: string[];
  description: string;
  portfolio: string[];
}

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-card border border-white/10 hover:shadow-elevation hover:scale-[1.02] transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
              {provider.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-foreground">{provider.name}</h3>
              {provider.verified && (
                <Badge className="h-5 w-5 text-accent-blue" />
              )}
            </div>
            <p className="text-muted-foreground">{provider.profession}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Heart className="h-5 w-5" />
        </Button>
      </div>


      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {provider.description}
      </p>

     

    

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">A partir de</span>
          <p className="text-xl font-bold text-primary">{provider.price}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary/20 text-primary hover:bg-primary/10"
            onClick={() => setIsModalOpen(true)}
          >
            Ver Perfil
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
          >
            Agendar
          </Button>
        </div>
      </div>
    </div>

    <ProviderModal 
      provider={provider}
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    />
    </>
  );
};