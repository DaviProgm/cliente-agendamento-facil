import { Button } from "@/components/ui/button";
import { Calendar, Users, BarChart3, LogOut, AlignJustify, User } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, onLogout, onToggleSidebar }: SidebarProps) => {
  const menuItems = [
    {
      id: "overview",
      label: "Visão Geral",
      icon: BarChart3,
    },
    {
      id: "clients",
      label: "Clientes",
      icon: Users,
    },
    {
      id: "appointments",
      label: "Agendamentos",
      icon: Calendar,
    },
    {
      id: "profile",
      label: "Meu Perfil",
      icon: User,
    },
  ];

  return (
    <div className="bg-card w-64 h-screen shadow-md border-r flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Cloktrix</h2>
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
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-secondary/20"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className="truncate text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t mt-auto">
        <Button
          variant="outline"
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
