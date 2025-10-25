import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getBusinessPublicProfile, getAvailability, createPublicSchedule } from '@/services/publicBookingService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepIndicator } from '@/components/Booking/StepIndicator';
import { ProfessionalSelector } from '@/components/Booking/ProfessionalSelector';
import { ServiceSelector } from '@/components/Booking/ServiceSelector';
import { TimeSlotPicker } from '@/components/Booking/TimeSlotPicker';

const appointmentSchema = z.object({
  clientName: z.string().min(1, "O nome é obrigatório."),
  clientEmail: z.string().email("Email inválido."),
  clientPhone: z.string().min(1, "O telefone é obrigatório."),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const STEPS = [
  { id: 'service', name: 'Serviço' },
  { id: 'professional', name: 'Profissional' },
  { id: 'time', name: 'Horário' },
  { id: 'details', name: 'Seus Dados' },
];

const BookingPage = () => {
  const { username } = useParams<{ username: string }>();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState('service');
  const [completedSteps, setCompletedSteps] = useState(new Set<string>());

  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | undefined>();
  const [selectedUnitId, setSelectedUnitId] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const form = useForm<AppointmentFormData>({ resolver: zodResolver(appointmentSchema) });

  const { data: businessData, isLoading: isLoadingBusiness, isError: isErrorBusiness } = useQuery({
    queryKey: ['business', username],
    queryFn: () => getBusinessPublicProfile(username!),
    enabled: !!username,
  });

  const { owner, professionals = [], units = [], services = [] } = businessData || {};
  const hasMultipleUnits = units.length > 1;

  const { data: availability, isLoading: isLoadingAvailability } = useQuery({
    queryKey: ['availability', username, selectedDate, selectedService?.id, selectedProfessionalId, selectedUnitId],
    queryFn: () => getAvailability(username!, selectedDate!, selectedService!.id, selectedProfessionalId!, selectedUnitId),
    enabled: !!username && !!selectedDate && !!selectedService && !!selectedProfessionalId && (hasMultipleUnits ? !!selectedUnitId : true),
  });

  const mutation = useMutation({ mutationFn: createPublicSchedule, onSuccess: () => setBookingConfirmed(true) });

  

  const goToNextStep = (step: string) => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    setCurrentStep(step);
  };

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setSelectedProfessionalId(undefined);
    setSelectedUnitId(undefined);
    setSelectedSlot(null);
    goToNextStep('professional');
  };

  const handleSelectProfessional = (id: string) => {
    setSelectedProfessionalId(id);
    if (units.length === 1) {
        setSelectedUnitId(units[0].id)
    }
    goToNextStep('time');
  };

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
    goToNextStep('details');
  };

  const onSubmit = (data: AppointmentFormData) => {
    mutation.mutate({
      ...data,
      professionalId: selectedProfessionalId!,
      serviceId: selectedService!.id,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      time: selectedSlot!,
      unitId: selectedUnitId,
    }, {
      onSuccess: () => {
        toast.success('Agendamento realizado com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['availability'] });
      },
      onError: (error: any) => {
        toast.error('Erro ao realizar agendamento.', { description: error.message });
      }
    });
  };

  if (isLoadingBusiness) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (isErrorBusiness) return <div className="flex justify-center items-center h-screen">Erro ao carregar informações do negócio.</div>;

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4">
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-2">Agendamento Confirmado!</h1>
          <p className="text-muted-foreground text-lg mb-8">Você receberá um email com os detalhes do seu agendamento.</p>
          <Button size="lg" onClick={() => window.location.reload()}>Fazer novo agendamento</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: owner?.cor_perfil || '#FFFFFF' }} className="min-h-screen text-foreground">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
        <header className="flex flex-col sm:flex-row items-center gap-6 mb-12">
          <Avatar className="h-28 w-28 border-4 border-background shadow-lg"><AvatarImage src={owner?.foto_perfil_url} /><AvatarFallback>{owner?.name?.charAt(0)}</AvatarFallback></Avatar>
          <div>
            <h1 className="text-4xl font-bold text-foreground">{owner?.name}</h1>
            <p className="text-foreground/80 mt-1 text-lg">{owner?.bio}</p>
          </div>
        </header>

        <div className="mb-12 flex justify-center">
          <StepIndicator steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} />
        </div>

        <div className="space-y-12">
          <section id="step-service">
            <h2 className="text-2xl font-bold mb-6">1. Escolha o Serviço</h2>
            <ServiceSelector services={services} selectedServiceId={selectedService?.id} onSelect={handleSelectService} />
          </section>

          {completedSteps.has('service') && (
            <section id="step-professional">
              <h2 className="text-2xl font-bold mb-6">2. Escolha o Profissional</h2>
              <ProfessionalSelector professionals={professionals} selectedProfessionalId={selectedProfessionalId} onSelect={handleSelectProfessional} />
            </section>
          )}

          {completedSteps.has('professional') && (
            <section id="step-time">
              <h2 className="text-2xl font-bold mb-6">3. Escolha o Horário</h2>
              {hasMultipleUnits && (
                <div className="mb-6 max-w-xs">
                  <label className="text-sm font-medium text-muted-foreground">Filtrar por unidade</label>
                  <Select onValueChange={setSelectedUnitId} value={selectedUnitId}>
                    <SelectTrigger><SelectValue placeholder="Todas as unidades" /></SelectTrigger>
                    <SelectContent>{units.map((u: any) => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg border bg-card self-start"
                  disabled={(date) => date < new Date(new Date().toDateString())}
                  locale={ptBR}
                />
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Horários disponíveis para {selectedDate ? format(selectedDate, 'dd/MM') : ''}</h3>
                  <TimeSlotPicker availability={availability} isLoading={isLoadingAvailability} selectedSlot={selectedSlot} onSelectSlot={handleSelectSlot} />
                </div>
              </div>
            </section>
          )}

          {completedSteps.has('time') && (
            <section id="step-details">
              <h2 className="text-2xl font-bold mb-6">4. Preencha seus Dados</h2>
              <Card className="max-w-lg mx-auto">
                <CardHeader>
                  <CardTitle>Confirmar Agendamento</CardTitle>
                  <CardDescription>Você está agendando <span className="font-bold text-primary">{selectedService?.name}</span> com <span className="font-bold text-primary">{professionals.find(p => p.id.toString() === selectedProfessionalId)?.name}</span> para <span className="font-bold text-primary">{format(selectedDate!, 'dd/MM/yyyy')} às {selectedSlot}</span>.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="clientName" render={({ field }) => (<FormItem><FormLabel>Nome</FormLabel><FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="clientEmail" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="clientPhone" render={({ field }) => (<FormItem><FormLabel>Telefone</FormLabel><FormControl><Input placeholder="(XX) XXXXX-XXXX" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <Button type="submit" disabled={mutation.isPending} size="lg" className="w-full">
                        {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirmando...</> : <>Confirmar Agendamento <ArrowRight className="ml-2 h-4 w-4" /></>}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </section>
          )}
        </div>

        <footer className="mt-24 py-8 border-t border-border/20 text-center text-foreground/60">
          <p>Potencializado por <Link to="/" className="font-bold hover:text-primary">AgendaPro</Link></p>
        </footer>
      </div>
    </div>
  );
};

export default BookingPage;
