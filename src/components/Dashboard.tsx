import React, { useState } from "react";
import { TrendingUp, Clock, Calendar, Eye, EyeClosed } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { EventsTable } from "./EventsTable";
import { WeeklyAgenda } from "./WeeklyAgenda";
import { RecentMessages } from "./RecentMessages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export function Dashboard() {
  const [viewMoney, setViewMoney] = useState<boolean>(true);
  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary">Visão Geral</h2>
        <div className="flex items-center gap-5">
          <Button variant="outline" onClick={() => setViewMoney(!viewMoney)}>{viewMoney ? <Eye /> : <EyeClosed></EyeClosed>}</Button>
          <Select defaultValue="u">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="u">Últimos 30 dias</SelectItem>
              <SelectItem value="m">Mês Atual</SelectItem>
              <SelectItem value="s">Semana</SelectItem>
              <SelectItem value="d">Dia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Ganhos Totais"
          value={viewMoney ? "R$ 53.900,00" : "••••"}
          subtitle="Nos ultimos 30 dias"
          icon={TrendingUp}
          iconColor="text-green-500"
          trend="+25% do último mês"
        />
        <MetricCard
          title="Saldo Pendente"
          value={viewMoney ? "R$ 12.350,00" : "••••"}
          subtitle="Aguardando pagamento"
          icon={Clock}
          iconColor="text-yellow-500"
        />
        <MetricCard
          title="Pagamentos Futuros"
          value={viewMoney ? "R$ 28.700,00" : "••••"}
          subtitle="Próximos 30 dias"
          icon={Calendar}
          iconColor="text-blue-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Events Table */}
        <div className="xl:col-span-2">
          <EventsTable />
        </div>

        {/* Right Column - Weekly Agenda */}
        <div>
          <WeeklyAgenda />
        </div>
      </div>

      {/* Recent Messages */}
      <div className="mt-6">
        <RecentMessages />
      </div>
    </div>
  );
}
