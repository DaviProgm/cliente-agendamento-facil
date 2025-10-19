import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Routes, Route, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, UserPlus, Menu, Bell, Plus } from "lucide-react";
import Sidebar from "@/components/DashboardCreditor/Sidebar";
import ClientList from "@/components/DashboardCreditor/ClientList";
import AppointmentList from "@/components/DashboardCreditor/AppointmentList";
import AddClientModal from "@/components/DashboardCreditor/AddClientModal";
import AddAppointmentModal from "@/components/DashboardCreditor/AddAppointmentModal";
import api from "@/instance/api";
import CreditorProfile from "@/components/DashboardCreditor/CreditorProfile";
import Assinatura from "./Assinatura";
import { parseISO, getMonth, getYear, differenceInMinutes, format } from 'date-fns';
import { useNotifications } from "@/hooks/useNotifications";
import { onMessageListener } from "@/firebase";
import { requestForToken } from "../firebase"; // ajuste o caminho conforme o local do arquivo
import { getMessaging, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import WeeklyReport from "@/components/DashboardCreditor/WeeklyReport";
import ServicesPage from "@/components/DashboardCreditor/ServicesPage"; // Importa a nova página
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Overview from "@/components/DashboardCreditor/Overview";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Notification {
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [agendamentosHoje, setAgendamentosHoje] = useState(0);
  const [agendamentosMes, setAgendamentosMes] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [providerId, setProviderId] = useState<number | null>(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);

  const navigate = useNavigate();
  const { permission, requestPermission, showNotification } = useNotifications();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    else {
      setIsLoading(false);
    }

    const stored = localStorage.getItem("userId");
    if (stored && !isNaN(parseInt(stored))) {
      setProviderId(parseInt(stored));
    }

    const tutorialShown = localStorage.getItem('dashboard_tutorial_shown');
    if (!tutorialShown) {
      setShowTutorial(true);
    }
  }, [navigate]);

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
                setHasNewNotification(true);
                setNotifications(prev => [newNotif, ...prev]);
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
          if (error?.response?.status === 401) {
            navigate("/login");
          }
        }
      }
    };

    fetchAgendamentos();
    const interval = setInterval(fetchAgendamentos, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate, permission, showNotification]);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleRequestPermission = async () => {
    await requestPermission();

    const token = await requestForToken();

    if (token) {
      try {
        await api.post("/token", { token });
        console.log("Token salvo no backend");
      } catch (error) {
        console.error("Erro ao salvar token no backend:", error);
      }
    } else {
      console.warn("Token não disponível");
    }
  };


  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        if (
          typeof payload === "object" &&
          payload !== null &&
          "notification" in payload
        ) {
          const { title, body } = (payload as any).notification;
          setHasNewNotification(true);
          setNotifications(prev => [{ title, body }, ...prev]);

          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body,
              icon: "/logo.png",
            });
          });
        }
      })
      .catch((err) => {
        console.error("❌ Erro no listener de mensagem:", err);
      });

  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }
  if (!providerId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Usuario não autenticado .</p>
      </div>
    );
  }
  return (
    <div className="flex h-dvh">
      <div className="hidden lg:block">
        <Sidebar
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarOpen(false)}
        />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative">
            <Sidebar
              onLogout={handleLogout}
              onToggleSidebar={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                {/* Title will be dynamic based on route */}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Popover onOpenChange={(open) => open && setHasNewNotification(false)}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {hasNewNotification && (
                      <span className="absolute top-0 right-0 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                      </span>
                    )}
                    <Bell className={`w-5 h-5`} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Notificações</h4>
                      <p className="text-sm text-muted-foreground">
                        Você tem {notifications.length} novas mensagens.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                          <div key={index} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                            <div className="grid gap-1">
                              <p className="text-sm font-medium">{notif.title}</p>
                              <p className="text-sm text-muted-foreground">{notif.body}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Nenhuma notificação nova.</p>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <Button size="sm" onClick={() => setNotifications([])}>Limpar</Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {permission === 'default' && (
                <Button onClick={handleRequestPermission} size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Ativar Notificações
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Outlet context={{ providerId, setIsClientModalOpen, setIsAppointmentModalOpen }} />
        </main>
      </div>

      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />
      <AddAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        onCreated={() => { }}
      />

      <Button
        onClick={() => setIsAppointmentModalOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-vibrant-accent text-white shadow-lg animate-pulse-glow"
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* Tutorial Dialog */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bem-vindo ao Workgate!</DialogTitle>
            <DialogDescription>
              Vamos te guiar pelos primeiros passos para você aproveitar ao máximo sua agenda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">1. Adicione seus Clientes</h3>
              <p className="text-sm text-muted-foreground">
                Comece cadastrando seus clientes na aba "Clientes". Assim, você terá todas as informações importantes à mão.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">2. Crie Agendamentos</h3>
              <p className="text-sm text-muted-foreground">
                Na aba "Agendamentos", você pode marcar os horários dos seus serviços. É rápido e fácil!
              </p>
            </div>
            <div>
              <h3 className="font-semibold">3. Controle Total no Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Aqui na "Visão Geral", você acompanha seus agendamentos do dia e do mês, e o total de clientes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">4. Gerencie sua Assinatura</h3>
              <p className="text-sm text-muted-foreground">
                Na aba "Meu Perfil", você pode ver e gerenciar os detalhes da sua assinatura.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              localStorage.setItem('dashboard_tutorial_shown', 'true');
              setShowTutorial(false);
            }}>Entendi!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
