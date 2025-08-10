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
//import { EventsTable } from "@/components/EventsTable";
import Eventos from '@/screens/Eventos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import CronogramasPage from "./screens/Cronograma";
import Relatorios from "@/screens/Reports";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard />;
      case "eventos":
        return (
          <Eventos />
        );
      case "agenda":
        return (
          <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-primary">
              Agenda
            </h2>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="disponivel">Agenda dos espaços</TabsTrigger>
                {/* <TabsTrigger value="reports">Relatórios</TabsTrigger> */}
              </TabsList>
              <TabsContent value="overview"><Calendar /></TabsContent>
              <TabsContent value="disponivel"><AgendaDisponivel /></TabsContent>
              {/* <TabsContent value="reports"><div>Seus relatórios</div></TabsContent> */}
            </Tabs>
            {/* <Tabs
              tabs={[
                { label: "Agenda", content: <Calendar /> },
                {
                  label: "Dia da semana",
                  content: <AgendaDisponivel />,
                },
                // {
                //   label: "Próximos Eventos",
                //   content: <EventsTable />,
                // }
              ]}
            /> */}
          </div>
        );
      case "financeiro":
        return <Finance />;
      case "mensagens":
        return <Chat />;
      case "servicos":
        return <ServicesExtra />;
      case "cronogramas":
        return <CronogramasPage />;
      case "relatorios":
        return <Relatorios />;
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
