import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Calendar } from "./components/Calendar";
import AgendaDisponivel from "./screens/Agenda-disponivel";
import Finance from "@/screens/Finance";
import Chat from "@/screens/Chat";
import ServicesExtra from "@/screens/ServicosExtras";
import { Tabs } from "./components/TabsEvents";
import { EventsTable } from "@/components/EventsTable";
import { Search } from "lucide-react";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard />;
      case "eventos":
        return (
          <div className="p-8 bg-[#FDFDFD] min-h-screen">
            <div className="relative mb-8">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent w-64"
                style={{ "--tw-ring-color": "#D19F28" } as React.CSSProperties}
              />
            </div>
            <Tabs
              tabs={[
                { label: "Agenda", content: <Calendar /> },
                {
                  label: "Datas Disponíveis",
                  content: <AgendaDisponivel />,
                },
                {
                  label: "Próximos Eventos",
                  content: <EventsTable />,
                },
                { label: "Concluídos", content: <div>Eventos concluídos</div> },
                {
                  label: "Todos",
                  content: <div>Todos os eventos listados</div>,
                },
              ]}
            />
          </div>
        );
      case "financeiro":
        return <Finance />
      case "mensagens":
        return <Chat />
      case "servicos":
        return <ServicesExtra />;
      case "notificacoes":
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Notificações
              </h2>
              <p className="text-gray-600">
                Seção de notificações em desenvolvimento...
              </p>
            </div>
          </div>
        );
      case "configuracoes":
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Configurações
              </h2>
              <p className="text-gray-600">
                Seção de configurações em desenvolvimento...
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD]">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={activeItem === "agenda" ? "Agenda" : "Dashboard"} />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;
