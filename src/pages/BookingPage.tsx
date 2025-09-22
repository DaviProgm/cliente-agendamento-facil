import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getProviderData, getAvailability, createAppointment } from '@/services/publicBookingService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

const appointmentSchema = z.object({
  clientName: z.string().min(1, "O nome é obrigatório."),
  clientEmail: z.string().email("Email inválido."),
  clientPhone: z.string().min(1, "O telefone é obrigatório."),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const BookingPage = () => {
  const { username } = useParams<{ username: string }>();
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const { data: providerData, isLoading: isLoadingProvider, isError: isErrorProvider } = useQuery({
    queryKey: ['provider', username],
    queryFn: () => getProviderData(username!),
    enabled: !!username,
  });

  const { data: availability, isLoading: isLoadingAvailability, isError: isErrorAvailability } = useQuery({
    queryKey: ['availability', username, selectedDate, selectedService?.id],
    queryFn: () => getAvailability(username!, selectedDate!, selectedService!.id),
    enabled: !!username && !!selectedDate && !!selectedService,
    onError: (error) => {
      console.error('Error fetching availability:', error);
      toast.error('Erro ao buscar horários disponíveis.', { description: error.message });
    },
  });

  const mutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success('Agendamento realizado com sucesso!');
      setBookingConfirmed(true);
      queryClient.invalidateQueries({ queryKey: ['availability'] });
    },
    onError: (error) => {
      toast.error('Erro ao realizar agendamento.', { description: error.message });
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    mutation.mutate({
      ...data,
      providerUsername: username!,
      serviceId: selectedService!.id,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      time: selectedSlot!,
    });
  };

  if (isLoadingProvider) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (isErrorProvider) return <div className="flex justify-center items-center h-screen">Erro ao carregar informações do profissional.</div>;

  if (bookingConfirmed) {
    return (
      <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center justify-center text-center h-screen">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Agendamento Confirmado!</h1>
        <p className="text-muted-foreground mb-6">Você receberá um email com os detalhes do seu agendamento.</p>
        <Button onClick={() => window.location.reload()}>Fazer novo agendamento</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <header className="flex items-center gap-4 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={providerData?.profilePicture} alt={providerData?.name} />
          <AvatarFallback>{providerData?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{providerData?.name}</h1>
          <p className="text-muted-foreground mt-1">{providerData?.bio}</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Selecione um Serviço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {providerData?.services.map((service: any) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedService?.id === service.id ? 'border-primary bg-primary/10 shadow-lg' : 'bg-card hover:bg-muted/50'}`}>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">Duração: {service.duration} min | Preço: R$ {service.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className={`lg:col-span-2 space-y-8 transition-opacity duration-500 ${selectedService ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <Card>
            <CardHeader>
              <CardTitle>2. Selecione uma Data e Horário</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-8">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border self-start"
                disabled={(date) => date < new Date(new Date().toDateString())}
              />
              <div className="w-full">
                <h3 className="font-semibold mb-4 text-center sm:text-left">Horários disponíveis para {selectedDate ? format(selectedDate, 'dd/MM') : ''}</h3>
                {isLoadingAvailability ? (
                  <div className="flex justify-center items-center h-32"><Loader2 className="h-6 w-6 animate-spin" /></div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availability?.length > 0 ? availability.map((slot: string) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? 'default' : 'outline'}
                        onClick={() => setSelectedSlot(slot)}>
                        {slot}
                      </Button>
                    )) : <p className="text-sm text-muted-foreground col-span-full text-center">Nenhum horário disponível para esta data.</p>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {selectedSlot && (
            <Card>
              <CardHeader>
                <CardTitle>3. Preencha seus dados para confirmar</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clientEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clientPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={mutation.isPending} className="w-full">
                      {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Agendando...</> : 'Confirmar Agendamento'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12 p-6 bg-card border rounded-lg text-center">
        <h2 className="text-xl font-bold mb-2">Faça seu próprio link de agendamento!</h2>
        <p className="text-muted-foreground mb-4">Crie sua página personalizada e gerencie seus agendamentos de forma fácil e eficiente.</p>
        <Button asChild>
          <Link to="/register">Comece Agora!</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingPage;
