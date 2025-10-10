import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWorkHours, saveWorkHours } from '@/services/workHoursService';
import { setDefaultWorkHours } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface WorkHour {
  dayOfWeek: number;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

const weekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const MyHoursPage = () => {
  const queryClient = useQueryClient();
  const [workHours, setWorkHours] = useState<WorkHour[]>([]);

  const { data: fetchedWorkHours, isLoading, isError } = useQuery({
    queryKey: ['workHours'],
    queryFn: getWorkHours,
  });

  const { data: profileData } = useQuery<{ id: string }>({ queryKey: ['profile'] });

  useEffect(() => {
    const initialWorkHours = weekDays.map((_, index) => ({
      dayOfWeek: index,
      isAvailable: false,
      startTime: '09:00',
      endTime: '18:00',
    }));

    if (fetchedWorkHours) {
      const mergedHours = initialWorkHours.map(day => {
        const fetchedDay = fetchedWorkHours.find(h => h.dayOfWeek === day.dayOfWeek);
        return fetchedDay ? { ...day, ...fetchedDay } : day;
      });
      setWorkHours(mergedHours);
    } else {
      setWorkHours(initialWorkHours);
    }
  }, [fetchedWorkHours]);

  const saveMutation = useMutation({
    mutationFn: saveWorkHours,
    onSuccess: () => {
      toast.success('Horários de trabalho salvos com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['workHours'] });
    },
    onError: (error) => {
      toast.error('Erro ao salvar os horários.', { description: error.message });
    },
  });

  const defaultHoursMutation = useMutation({
    mutationFn: () => setDefaultWorkHours(profileData!.id),
    onSuccess: () => {
      toast.success('Horários padrão restaurados com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['workHours'] });
    },
    onError: (error) => {
      toast.error('Erro ao restaurar os horários.', { description: error.message });
    },
  });

  const handleHourChange = (dayOfWeek: number, field: keyof WorkHour, value: string | boolean) => {
    setWorkHours(currentHours =>
      currentHours.map(hour =>
        hour.dayOfWeek === dayOfWeek ? { ...hour, [field]: value } : hour
      )
    );
  };

  const handleSubmit = () => {
    saveMutation.mutate(workHours);
  };

  const handleSetDefault = () => {
    if (profileData?.id) {
      defaultHoursMutation.mutate();
    } else {
      toast.error("Não foi possível identificar o usuário para restaurar os horários.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Erro ao carregar os horários de trabalho.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Meus Horários</CardTitle>
          <CardDescription>
            Defina seus dias e horários de trabalho. Os clientes só poderão agendar nos horários disponíveis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {workHours.map(({ dayOfWeek, isAvailable, startTime, endTime }) => (
            <div key={dayOfWeek} className="p-4 border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Switch
                  id={`available-${dayOfWeek}`}
                  checked={isAvailable}
                  onCheckedChange={(checked) => handleHourChange(dayOfWeek, 'isAvailable', checked)}
                />
                <Label htmlFor={`available-${dayOfWeek}`} className="w-28 font-medium">
                  {weekDays[dayOfWeek]}
                </Label>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Input
                  type="time"
                  value={startTime}
                  disabled={!isAvailable}
                  onChange={(e) => handleHourChange(dayOfWeek, 'startTime', e.target.value)}
                  className="w-full sm:w-auto"
                />
                <span className="text-muted-foreground">até</span>
                <Input
                  type="time"
                  value={endTime}
                  disabled={!isAvailable}
                  onChange={(e) => handleHourChange(dayOfWeek, 'endTime', e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
          <Button 
            variant="outline" 
            onClick={handleSetDefault} 
            disabled={defaultHoursMutation.isPending || !profileData?.id}
          >
            {defaultHoursMutation.isPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Restaurando...</>
            ) : (
              "Restaurar Padrão"
            )}
          </Button>
          <Button onClick={handleSubmit} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
            ) : (
              "Salvar Horários"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyHoursPage;

