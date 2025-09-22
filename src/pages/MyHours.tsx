import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getWorkHours, saveWorkHours } from '@/services/workHoursService';
import { setDefaultWorkHours } from '@/services/userService';

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const MyHoursPage = () => {
  const queryClient = useQueryClient();
  const [workHours, setWorkHours] = useState<any[]>([]);

  const { data, isLoading, isError } = useQuery({ queryKey: ['workHours'], queryFn: getWorkHours });

  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
      setWorkHours(sortedData);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: saveWorkHours,
    onSuccess: () => {
      toast.success('Horários de trabalho salvos com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['workHours'] });
    },
    onError: (error) => {
      console.error('Error saving work hours:', error);
      toast.error('Erro ao salvar horários.', { description: error.message });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: setDefaultWorkHours,
    onSuccess: () => {
      toast.success('Agenda redefinida para o padrão com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['workHours'] });
    },
    onError: (error) => {
      console.error('Error setting default work hours:', error);
      toast.error('Erro ao redefinir agenda para o padrão.', { description: error.message });
    },
  });

  const handleSave = () => {
    console.log('Saving work hours:', workHours);
    saveMutation.mutate(workHours);
  };

  const handleSetDefault = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setDefaultMutation.mutate(userId);
    } else {
      toast.error("ID do usuário não encontrado.");
    }
  };

  const handleWorkHourChange = (dayIndex: number, field: string, value: any) => {
    const updatedWorkHours = [...workHours];
    updatedWorkHours[dayIndex] = { ...updatedWorkHours[dayIndex], [field]: value };
    setWorkHours(updatedWorkHours);
  };

  if (isLoading) return <div>Carregando horários...</div>;
  if (isError) return <div>Erro ao carregar horários.</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Meus Horários</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleSetDefault} disabled={setDefaultMutation.isPending} className="w-full sm:w-auto">
            {setDefaultMutation.isPending ? 'Redefinindo...' : 'Redefinir para Agenda Padrão'}
          </Button>
          <Button onClick={handleSave} disabled={saveMutation.isPending} className="w-full sm:w-auto">
            {saveMutation.isPending ? 'Salvando...' : 'Salvar Horários'}
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {workHours.map((day, index) => (
          <div key={index} className="p-4 border rounded-lg bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className='flex items-center gap-4'>
              <Checkbox
                id={`isAvailable-${index}`}
                checked={day.isAvailable}
                onCheckedChange={(checked) => handleWorkHourChange(index, 'isAvailable', checked)}
              />
              <label htmlFor={`isAvailable-${index}`} className='text-lg font-medium sm:w-32'>{daysOfWeek[day.dayOfWeek]}</label>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Input
                type="time"
                value={day.startTime}
                disabled={!day.isAvailable}
                onChange={(e) => handleWorkHourChange(index, 'startTime', e.target.value)}
                className="w-full sm:w-32"
              />
              <span>-</span>
              <Input
                type="time"
                value={day.endTime}
                disabled={!day.isAvailable}
                onChange={(e) => handleWorkHourChange(index, 'endTime', e.target.value)}
                className="w-full sm:w-32"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHoursPage;
