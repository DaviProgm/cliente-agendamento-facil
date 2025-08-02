import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, UserPlus, Menu, Bell } from "lucide-react";
import Sidebar from "@/components/DashboardCreditor/Sidebar";
import ClientList from "@/components/DashboardCreditor/ClientList";
import AppointmentList from "@/components/DashboardCreditor/AppointmentList";
import AddClientModal from "@/components/DashboardCreditor/AddClientModal";
import AddAppointmentModal from "@/components/DashboardCreditor/AddAppointmentModal";
import api from "@/instance/api";
import CreditorProfile from "@/components/DashboardCreditor/CreditorProfile";
import { parseISO, getMonth, getYear, differenceInMinutes, format } from 'date-fns';
import { useNotifications } from "@/hooks/useNotifications";
import { requestForToken, onMessageListener } from "@/firebase";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [agendamentosHoje, setAgendamentosHoje] = useState(0);
  const [agendamentosMes, setAgendamentosMes] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { permission, requestPermission, showNotification } = useNotifications();
  console.log("✅ Dashboard carregando...");

  console.log("📱 Plataforma:", navigator.userAgent);
  console.log("🔐 Token:", localStorage.getItem("token"));
  console.log("🔔 Permissão de notificações:", Notification.permission);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);


  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get("/agendamentos");
        const agendamentos = response.data;

        const hoje = new Date();
        const hojeStr = hoje.toISOString().split("T")[0];
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        const countHoje = agendamentos.filter(
          (ag: any) => ag.date === hojeStr
        ).length;

        const countMes = agendamentos.filter((ag: any) => {
          const dataAg = parseISO(ag.date);
          return getMonth(dataAg) === mesAtual && getYear(dataAg) === anoAtual;
        }).length;

        setAgendamentosHoje(countHoje);
        setAgendamentosMes(countMes);

        // Schedule notifications
        if (permission === 'granted') {
          agendamentos.forEach((ag: any) => {
            const appointmentDate = parseISO(`${ag.date}T${ag.startTime}`);
            const now = new Date();
            const diffMinutes = differenceInMinutes(appointmentDate, now);

            if (diffMinutes > 0 && diffMinutes <= 60) {
              showNotification('Lembrete de Agendamento', {
                body: `Você tem um agendamento em ${format(appointmentDate, 'HH:mm')}.`,
                icon: '/logo.png'
              });
            }
          });
        }

      } catch (error: any) {
        console.error("Erro ao buscar agendamentos:", error);
        if (error?.response?.status === 401) {
          navigate("/login");
        }
      }
    };


    fetchAgendamentos();
    const interval = setInterval(fetchAgendamentos, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [navigate, permission, showNotification]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes");
        setTotalClientes(response.data.length);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "clients":
        return <ClientList onAddClient={() => setIsClientModalOpen(true)} />;
      case "appointments":
        return (
          <AppointmentList
            onAddAppointment={() => setIsAppointmentModalOpen(true)}
            refreshFlag={false}
          />
        );
      default:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white text-gray-900 shadow-xl border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-[#8B5CF6]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClientes || 0}</div>
                <p className="text-xs text-gray-500">+2 novos este mês</p>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-900 shadow-xl border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-[#8B5CF6]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agendamentosHoje}</div>
                <p className="text-xs text-gray-500">pendentes</p>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-900 shadow-xl border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Agendamentos Mês</CardTitle>
                <Calendar className="h-4 w-4 text-[#8B5CF6]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agendamentosMes}</div>
                <p className="text-xs text-gray-500">+12% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <CreditorProfile providerId={parseInt(localStorage.getItem("userId") || "0")} />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
              onLogout={handleLogout}
              onToggleSidebar={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 shadow-sm p-4">
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
                {activeTab === "overview" && "Visão Geral"}
                {activeTab === "clients" && "Clientes"}
                {activeTab === "appointments" && "Agendamentos"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {permission === 'default' && (
                <Button onClick={requestPermission} size="sm" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Ativar Notificações
                </Button>
              )}
              {activeTab === "clients" && (
                <Button onClick={() => setIsClientModalOpen(true)} size="sm" className="hidden sm:flex">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Cliente
                </Button>
              )}
              {activeTab === "appointments" && (
                <Button onClick={() => setIsAppointmentModalOpen(true)} size="sm" className="hidden sm:flex">
                  <Calendar className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
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
    </div>
  );
};

export default Dashboard;