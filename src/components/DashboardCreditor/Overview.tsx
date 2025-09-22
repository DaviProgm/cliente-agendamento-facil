import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import WeeklyReport from "./WeeklyReport";
import CreditorProfile from "./CreditorProfile";
import React, { useState, useEffect } from "react";


import api from "@/instance/api";
import { parseISO, getMonth, getYear, differenceInMinutes, format } from 'date-fns';
import { useNotifications } from "@/hooks/useNotifications";
import { useOutletContext } from "react-router-dom";

const Overview = () => {
  const [agendamentosHoje, setAgendamentosHoje] = useState(0);
  const [agendamentosMes, setAgendamentosMes] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [providerId, setProviderId] = useState<number | null>(null);

  const { permission, showNotification } = useNotifications();
  const { setIsClientModalOpen, setIsAppointmentModalOpen } = useOutletContext() as any; // Get from context

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored && !isNaN(parseInt(stored))) {
      setProviderId(parseInt(stored));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAgendamentos = async () => {
      try {
        const response = await api.get("/agendamentos");
        if (!isMounted) return;

        const agendamentos = response.data;
        const hoje = new Date();
        const hojeStr = hoje.toISOString().split("T")[0];
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        const countHoje = agendamentos.filter((ag: any) => ag.date === hojeStr).length;
        const countMes = agendamentos.filter((ag: any) => {
          const dataAg = parseISO(ag.date);
          return getMonth(dataAg) === mesAtual && getYear(dataAg) === anoAtual;
        }).length;

        setAgendamentosHoje(countHoje);
        setAgendamentosMes(countMes);

        if (permission === 'granted') {
          agendamentos.forEach((ag: any) => {
            if (ag.date && ag.time) {
              const appointmentDate = parseISO(`${ag.date}T${ag.time}:00`);
              const now = new Date();
              const diffMinutes = differenceInMinutes(appointmentDate, now);

              if (diffMinutes > 0 && diffMinutes <= 60) {
                const newNotif = {
                  title: 'Lembrete de Agendamento',
                  body: `Você tem um agendamento em ${format(appointmentDate, 'HH:mm')}.`
                };
                showNotification(newNotif.title, {
                  body: newNotif.body,
                  icon: '/logo.png'
                });
              }
            }
          });
        }

      } catch (error: any) {
        if (isMounted) {
          console.error("Erro ao buscar agendamentos:", error);
        }
      }
    };

    fetchAgendamentos();
    const interval = setInterval(fetchAgendamentos, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [permission, showNotification]);

  useEffect(() => {
    let isMounted = true;
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes");
        if (isMounted) {
          setTotalClientes(response.data.length);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Erro ao buscar clientes:", error);
        }
      }
    };
    fetchClientes();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClientes || 0}</div>
            <p className="text-xs text-muted-foreground">+2 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agendamentosHoje}</div>
            <p className="text-xs text-muted-foreground">pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Mês</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agendamentosMes}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>
      <WeeklyReport />
      {providerId && <CreditorProfile providerId={providerId} />}
    </div>
  );
};

export default Overview;
