import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Calendar } from "./components/Calendar";
import AgendaDisponivel from "./screens/Agenda-disponivel";
import Finance from "@/screens/Finance";
import Chat from "@/screens/Chat";
import ServicesExtra from "@/screens/ServicosExtras";
import Notifications from "@/screens/Notifications";
import Configuration from "@/screens/Configuration";
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
            <Tabs
              tabs={[
                { label: "Agenda", content: <Calendar /> },
                {
                  label: "Dia da semana",
                  content: <AgendaDisponivel />,
                },
                {
                  label: "Próximos Eventos",
                  content: <EventsTable />,
                }
              ]}
            />
          </div>
        );
      case "financeiro":
        return <Finance />;
      case "mensagens":
        return <Chat />;
      case "servicos":
        return <ServicesExtra />;
      case "notificacoes":
        return <Notifications />;
      case "configuracoes":
        return <Configuration />;
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
