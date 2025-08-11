import {
  Home,
  Calendar,
  DollarSign,
  MessageSquare,
  Settings,
  Bell,
  Briefcase,
  Timer,
  NotebookPen,
} from "lucide-react";
import Logo from "@/assets/logo.jpeg"

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "eventos", label: "Eventos", icon: Calendar },
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "mensagens", label: "Mensagens", icon: MessageSquare },
  { id: "servicos", label: "Serviços", icon: Briefcase },
  { id: "cronogramas", label: "Cronogramas de evento", icon: Timer },
  { id: "relatorios", label: "Relatórios", icon: NotebookPen },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar({ activeItem, setActiveItem }: SidebarProps) {
  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div>
            <img
              src={Logo}
              alt="Grupo Familia Reis"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive ? "text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              style={isActive ? { backgroundColor: "#D19F28" } : {}}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
