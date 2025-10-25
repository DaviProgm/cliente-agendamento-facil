
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Professional {
  id: string;
  name: string;
  foto_perfil_url?: string;
  bio?: string;
}

interface ProfessionalSelectorProps {
  professionals: Professional[];
  selectedProfessionalId?: string;
  onSelect: (id: string) => void;
}

export const ProfessionalSelector = ({ professionals, selectedProfessionalId, onSelect }: ProfessionalSelectorProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
        <div className="flex space-x-4">
            {professionals.map((prof) => (
                <div key={prof.id} onClick={() => onSelect(prof.id)} className="cursor-pointer flex-shrink-0">
                    <div className={cn(
                        "rounded-full p-1 border-2 transition-colors duration-300",
                        selectedProfessionalId === prof.id ? "border-primary" : "border-transparent hover:border-primary/50"
                    )}>
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={prof.foto_perfil_url} />
                            <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <p className={cn(
                        "mt-2 text-center text-sm font-medium transition-colors",
                        selectedProfessionalId === prof.id ? "text-primary" : "text-foreground"
                    )}>
                        {prof.name}
                    </p>
                </div>
            ))}
        </div>
    </div>
  );
};
