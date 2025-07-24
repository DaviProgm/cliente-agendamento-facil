import { useEffect, useState } from "react";
import api from "@/instance/api";
import { FiMenu, FiBriefcase } from "react-icons/fi";
import { User } from "lucide-react";

export default function DashboardCustumer() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [providers, setProviders] = useState([]);
    const [loadingProviders, setLoadingProviders] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        async function fetchAppointments() {
            try {
                const response = await api.get(`/agendamentos/${userId}`);
                setAppointments(response.data);
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAppointments();
    }, []);
    useEffect(() => {
        async function fetchProviders() {
            setLoadingProviders(true);
            try {
                const response = await api.get("/users?role=creditor");
                setProviders(response.data);
            } catch (error) {
                console.error("Erro ao buscar prestadores:", error);
            } finally {
                setLoadingProviders(false);
            }
        }
        fetchProviders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}>
                <div className="flex items-center px-6 py-4 border-b">
                    <span className="text-xl font-bold">Menu</span>
                    <button className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
                        <FiMenu size={24} />
                    </button>
                </div>
                <nav className="mt-6">
                    <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none">
                        <FiBriefcase className="mr-2" />
                        Serviços
                    </button>
                    <div className="px-6 mt-2">
                        <h3 className="text-sm font-semibold mb-2">Prestadores cadastrados</h3>
                        {loadingProviders ? (
                            <p>Carregando...</p>
                        ) : providers.length === 0 ? (
                            <p>Nenhum prestador encontrado.</p>
                        ) : (
                            <ul className="space-y-2">
                                {providers.map((provider: any) => (
                                    <li key={provider.id} className="flex items-center space-x-2">
                                        <span className="font-medium">{provider.name}</span>
                                        <span className="text-xs text-gray-500">({provider.email})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 md:ml-64 p-6">
                <button className="md:hidden mb-4" onClick={() => setSidebarOpen(true)}>
                    <FiMenu size={28} />
                </button>
                <h1 className="text-3xl font-bold mb-6 text-center">Dashboard do Cliente</h1>

                {/* Cards de Prestadores */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Prestadores de Serviço</h2>
                    {loadingProviders ? (
                        <p>Carregando prestadores...</p>
                    ) : providers.length === 0 ? (
                        <p>Nenhum prestador cadastrado.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {providers.map((provider: any) => (
                                <div key={provider.id} className="bg-white rounded-lg shadow p-4">
                                    <h3 className="text-lg font-bold">{provider.name}</h3>
                                    <p className="text-sm text-gray-600">{provider.email}</p>
                                    <button
                                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                                        onClick={() => alert(`Agendar com ${provider.name}`)}
                                    >
                                        Agendar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Seção de Agendamentos */}
                <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Meus Agendamentos</h2>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : appointments.length === 0 ? (
                        <p>Você não possui agendamentos.</p>
                    ) : (
                        <ul className="space-y-4">
                            {appointments.map((appt: any) => (
                                <li key={appt.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                        <span className="font-bold">Serviço:</span> {appt.serviceName}<br />
                                        <span className="font-bold">Data:</span> {new Date(appt.date).toLocaleString()}<br />
                                        <span className="font-bold">Prestador:</span> {appt.providerName}
                                    </div>
                                    <span className="mt-2 md:mt-0 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{appt.status}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}
