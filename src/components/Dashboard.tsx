import React from "react";
import { TrendingUp, Clock, Calendar } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { EventsTable } from "./EventsTable";
import { WeeklyAgenda } from "./WeeklyAgenda";
import { RecentMessages } from "./RecentMessages";

export function Dashboard() {
  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Visão Geral</h3>
        <select
          className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ "--tw-ring-color": "#D19F28" } as React.CSSProperties}
        >
          <option value="todos">Últimos 30 dias</option>
          <option value="mes">Mês Atual</option>
          <option value="semana">Semana</option>
          <option value="dia">Dia</option>
        </select>
      </div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Ganhos Totais"
          value="R$ 53.900,00"
          subtitle="+25% do último mês"
          icon={TrendingUp}
          iconColor="text-green-500"
          trend="+25% do último mês"
        />
        <MetricCard
          title="Saldo Pendente"
          value="R$ 12.350,00"
          subtitle="Aguardando pagamento"
          icon={Clock}
          iconColor="text-yellow-500"
        />
        <MetricCard
          title="Pagamentos Futuros"
          value="R$ 28.700,00"
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
