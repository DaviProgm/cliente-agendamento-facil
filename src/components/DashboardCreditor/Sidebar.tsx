
  import { Button } from "@/components/ui/button";
import { on } from "events";
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
      <div className="bg-white w-64 h-screen shadow-sm border-r flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">AgendaPro </h2>
          <div className="">
            <button className="border-[1px] px-2 py-1 rounded-md border-gray-300 lg:hidden" onClick={onToggleSidebar}>
              <AlignJustify size={16} color="black" width={14} height={18} strokeWidth={2}/>
            </button>
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t mt-auto">
          <Button
            variant="outline"
            className="w-full"
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
