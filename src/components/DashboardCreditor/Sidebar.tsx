import { Button } from "@/components/ui/button";
import { Calendar, Users, BarChart3, LogOut, AlignJustify } from "lucide-react";

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
  ];

  return (
    <div className="bg-white w-64 h-screen shadow-md border-r flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">Cloktrix</h2>
        <button
          className="border px-2 py-1 rounded-md border-gray-300 lg:hidden"
          onClick={onToggleSidebar}
        >
          <AlignJustify size={16} className="text-gray-700" />
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
                  ? "bg-gray-100 text-[#8B5CF6] font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-[#8B5CF6]" : "text-gray-500"}`} />
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
