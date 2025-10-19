import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '@/instance/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface ReportData {
  clientIncrease: number;
  completedSchedules: number;
  canceledSchedules: number;
  period: {
    start: string;
    end: string;
  };
}

const WeeklyReport = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get('/reports/weekly');
        setReport(response.data);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError('Este é um recurso exclusivo para assinantes do plano PRO.');
        } else {
          setError('Erro ao buscar o relatório semanal.');
        }
        console.error('Falha ao buscar relatório semanal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const chartData = report ? [
    { name: 'Clientes Novos', valor: report.clientIncrease, fill: '#00BFFF' },
    { name: 'Agend. Concluídos', valor: report.completedSchedules, fill: '#6E00FF' },
    { name: 'Agend. Cancelados', valor: report.canceledSchedules, fill: 'hsl(var(--destructive))' },
  ] : [];

  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-popover border rounded-lg shadow-lg">
          <p className="label text-popover-foreground">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Relatório Semanal (PRO)</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <p className="text-muted-foreground">Carregando dados do relatório...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Relatório Semanal (PRO)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
          <Link to="/dashboard/subscription">
            <Button className="mt-4">Fazer Upgrade para PRO</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório Semanal (PRO)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Resumo da semana: {new Date(report.period.start).toLocaleDateString()} a {new Date(report.period.end).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: 'hsl(var(--accent))' }} content={renderCustomTooltip} />
            <Bar dataKey="valor" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyReport;
