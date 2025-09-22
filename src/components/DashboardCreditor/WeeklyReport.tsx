import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '@/instance/api';

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Relatório Semanal (PRO)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando...</p>
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
          <p className="text-red-500">{error}</p>
          <Link to="/assinatura">
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
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Relatório Semanal (PRO)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Período: {new Date(report.period.start).toLocaleDateString()} a {new Date(report.period.end).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Variação de Clientes</p>
            <p className="text-2xl font-bold">{report.clientIncrease > 0 ? `+${report.clientIncrease}` : report.clientIncrease}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Agendamentos Concluídos</p>
            <p className="text-2xl font-bold">{report.completedSchedules}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Agendamentos Cancelados</p>
            <p className="text-2xl font-bold">{report.canceledSchedules}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyReport;
