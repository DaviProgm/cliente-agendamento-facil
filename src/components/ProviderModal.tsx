import { useState } from "react";
import { Star, MapPin, Clock, Badge, Calendar, Phone, Mail, Award, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Provider } from "./ProviderCard";

interface ProviderModalProps {
  provider: Provider;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AvailableDay {
  date: string;
  dayName: string;
  slots: TimeSlot[];
}

export const ProviderModal = ({ provider, open, onOpenChange }: ProviderModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Mock data para horários disponíveis
  const availableDays: AvailableDay[] = [
    {
      date: "2024-01-15",
      dayName: "Segunda",
      slots: [
        { time: "09:00", available: true },
        { time: "10:00", available: false },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "15:00", available: true },
        { time: "16:00", available: false },
      ]
    },
    {
      date: "2024-01-16",
      dayName: "Terça",
      slots: [
        { time: "09:00", available: true },
        { time: "10:00", available: true },
        { time: "11:00", available: false },
        { time: "14:00", available: true },
        { time: "15:00", available: false },
        { time: "16:00", available: true },
      ]
    },
    {
      date: "2024-01-17",
      dayName: "Quarta",
      slots: [
        { time: "09:00", available: false },
        { time: "10:00", available: true },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "15:00", available: true },
        { time: "16:00", available: true },
      ]
    }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      // Aqui seria a lógica de agendamento
      console.log(`Agendamento marcado para ${selectedDate} às ${selectedTime}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/20 backdrop-blur-md border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Perfil do Profissional
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header do Profissional */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{provider.name}</h2>
                  {provider.verified && (
                    <Badge className="h-6 w-6 text-accent-blue" />
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-2">{provider.profession}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-muted-foreground text-sm">({provider.reviewCount} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Responde em {provider.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">A partir de</p>
              <p className="text-3xl font-bold text-primary">{provider.price}</p>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-background/50">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="schedule">Agendar</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              {/* Descrição */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Sobre</h3>
                <p className="text-muted-foreground leading-relaxed">{provider.description}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.tags?.map((tag, index) => (
                    <UIBadge
                      key={index}
                      variant="secondary"
                      className="bg-accent/50 text-accent-foreground border-accent/20"
                    >
                      {tag}
                    </UIBadge>
                  ))}
                </div>
              </div>

              {/* Portfolio */}
              {provider.portfolio?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Portfolio</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {provider.portfolio.map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-square rounded-lg bg-muted overflow-hidden hover:scale-105 transition-transform duration-300"
                      >
                        <img 
                          src={image} 
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contato */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Contato</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{provider.name.toLowerCase().replace(' ', '.')}@email.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>(11) 99999-9999</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Escolha o dia e horário</h3>
                
                {/* Seleção de Dias */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {availableDays.map((day) => (
                    <div
                      key={day.date}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedDate === day.date
                          ? 'bg-gradient-primary text-primary-foreground border-primary shadow-glow'
                          : 'bg-card border-border/50 hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime("");
                      }}
                    >
                      <p className="font-semibold">{day.dayName}</p>
                      <p className="text-sm opacity-80">
                        {new Date(day.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-xs mt-1">
                        {day.slots.filter(slot => slot.available).length} horários
                      </p>
                    </div>
                  ))}
                </div>

                {/* Seleção de Horários */}
                {selectedDate && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Horários disponíveis</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {availableDays
                        .find(day => day.date === selectedDate)
                        ?.slots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`${
                              selectedTime === slot.time
                                ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                                : 'border-border/50 hover:border-primary/50'
                            } ${
                              !slot.available
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                          >
                            {slot.time}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Resumo e Confirmação */}
                {selectedDate && selectedTime && (
                  <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <h4 className="font-semibold text-foreground">Resumo do Agendamento</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Profissional:</span> {provider.name}</p>
                      <p><span className="text-muted-foreground">Serviço:</span> {provider.profession}</p>
                      <p><span className="text-muted-foreground">Data:</span> {new Date(selectedDate).toLocaleDateString('pt-BR')}</p>
                      <p><span className="text-muted-foreground">Horário:</span> {selectedTime}</p>
                      <p><span className="text-muted-foreground">Valor:</span> {provider.price}</p>
                    </div>
                    <Button 
                      onClick={handleBooking}
                      className="w-full mt-4 bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
                    >
                      Confirmar Agendamento
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
