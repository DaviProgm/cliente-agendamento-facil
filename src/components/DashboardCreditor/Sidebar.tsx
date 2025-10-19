import { Button } from "@/components/ui/button";
import { Calendar, Users, BarChart3, LogOut, AlignJustify, User, Wrench, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

const Sidebar = ({ onLogout, onToggleSidebar }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      id: "overview",
      label: "Visão Geral",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      id: "clients",
      label: "Clientes",
      icon: Users,
      path: "/dashboard/clients",
    },
    {
      id: "appointments",
      label: "Agendamentos",
      icon: Calendar,
      path: "/dashboard/appointments",
    },
    {
      id: "services",
      label: "Meus Serviços",
      icon: Wrench,
      path: "/dashboard/services",
    },
    {
      id: "profile",
      label: "Meu Perfil",
      icon: User,
      path: "/dashboard/profile",
    },
    {
      id: "my-hours",
      label: "Meus Horários",
      icon: Clock,
      path: "/dashboard/my-hours",
    },
    {
      id: "subscription",
      label: "Assinatura",
      icon: User, // You might want to change this icon
      path: "/dashboard/subscription",
    },
  ];

  return (
    <div className="bg-card w-64 h-dvh shadow-md border-r flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Workgate</h2>
        <button
          className="border px-2 py-1 rounded-md border-border lg:hidden"
          onClick={onToggleSidebar}
        >
          <AlignJustify size={16} className="text-muted-foreground" />
        </button>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-secondary/20"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className="truncate text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t mt-auto">
        <Button
          className="w-full text-sm"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
