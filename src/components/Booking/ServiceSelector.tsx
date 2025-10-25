
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface ServiceSelectorProps {
  services: Service[];
  selectedServiceId?: string;
  onSelect: (service: Service) => void;
}

export const ServiceSelector = ({ services, selectedServiceId, onSelect }: ServiceSelectorProps) => {
  return (
    <div className="space-y-3">
      {services.map((service) => (
        <Card 
          key={service.id} 
          onClick={() => onSelect(service)} 
          className={cn(
            "cursor-pointer transition-all duration-300 p-4",
            selectedServiceId === service.id 
              ? "border-primary bg-primary/10 shadow-lg"
              : "bg-card hover:bg-muted/50"
          )}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground">{service.name}</h3>
            <p className="text-lg font-bold text-primary">R$ {Number(service.price).toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{service.duration} minutos</p>
        </Card>
      ))}
      {services.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">Nenhum serviço disponível para esta seleção.</p>
      )}
    </div>
  );
};
