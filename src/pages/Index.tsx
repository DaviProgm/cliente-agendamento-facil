import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, UserPlus, Menu } from "lucide-react";
import Sidebar from "@/components/DashboardCreditor/Sidebar";
import ClientList from "@/components/DashboardCreditor/ClientList";
import AppointmentList from "@/components/DashboardCreditor/AppointmentList";
import AddClientModal from "@/components/DashboardCreditor/AddClientModal";
import AddAppointmentModal from "@/components/DashboardCreditor/AddAppointmentModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [agendamentosHoje, setAgendamentosHoje] = useState(0);
  const [agendamentosMes, setAgendamentosMes] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Apenas controla o loading inicial
  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token não encontrado.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://schedule-control-api.onrender.com/agendamentos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const agendamentos = response.data;

        const hoje = new Date();
        const hojeStr = hoje.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        const countHoje = agendamentos.filter((ag: any) => ag.date === hojeStr).length;

        const countMes = agendamentos.filter((ag: any) => {
          const dataAg = new Date(ag.date);
          return (
            dataAg.getMonth() === mesAtual &&
            dataAg.getFullYear() === anoAtual
          );
        }).length;

        setAgendamentosHoje(countHoje);
        setAgendamentosMes(countMes);
      } catch (error: any) {
        console.error("Erro ao buscar agendamentos:", error);
        if (error?.response?.status === 401) {
          navigate("/login");
        }
      }
    }

    fetchAgendamentos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClientes || 25}</div>
                <p className="text-xs text-muted-foreground">+2 novos este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agendamentosHoje}</div>
                <p className="text-xs text-muted-foreground">pendentes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agendamentos Mês</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agendamentosMes}</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
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
    <div className="flex h-screen bg-gray-100">
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
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
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b p-4">
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
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {activeTab === "overview" && "Visão Geral"}
                {activeTab === "clients" && "Clientes"}
                {activeTab === "appointments" && "Agendamentos"}
              </h1>
            </div>
            <div className="flex gap-2">
              {activeTab === "clients" && (
                <Button
                  onClick={() => setIsClientModalOpen(true)}
                  size="sm"
                  className="hidden sm:flex"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Cliente
                </Button>
              )}
              {activeTab === "appointments" && (
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              )}
              {activeTab === "clients" && (
                <Button
                  onClick={() => setIsClientModalOpen(true)}
                  size="sm"
                  className="sm:hidden"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              )}
              {activeTab === "appointments" && (
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  size="sm"
                  className="sm:hidden"
                >
                  <Calendar className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
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
        onCreated={() => {}}
      />
    </div>
  );
};

export default Dashboard;
