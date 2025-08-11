// src/pages/relatorios/overview.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77"]; // Casamento, Debutante, Corporativo

// Dados para gráfico de pizza - tipos de eventos
const eventosPorTipo = [
  { name: "Casamento", value: 45 },
  { name: "Debutante", value: 25 },
  { name: "Corporativo", value: 30 },
];

// Dados para gráfico de barras - receita mensal
const receitaMensal = [
  { mes: "Jan", receita: 35000 },
  { mes: "Fev", receita: 42000 },
  { mes: "Mar", receita: 38000 },
  { mes: "Abr", receita: 50000 },
  { mes: "Mai", receita: 47000 },
  { mes: "Jun", receita: 52000 },
];

// Dados para linha - eventos por mês
const eventosPorMes = [
  { mes: "Jan", eventos: 12 },
  { mes: "Fev", eventos: 15 },
  { mes: "Mar", eventos: 10 },
  { mes: "Abr", eventos: 18 },
  { mes: "Mai", eventos: 20 },
  { mes: "Jun", eventos: 22 },
];

// Dados para taxa de ocupação
const ocupacaoMensal = [
  { mes: "Jan", ocupacao: 75 },
  { mes: "Fev", ocupacao: 82 },
  { mes: "Mar", ocupacao: 68 },
  { mes: "Abr", ocupacao: 90 },
  { mes: "Mai", ocupacao: 85 },
  { mes: "Jun", ocupacao: 95 },
];

export default function OverviewRelatorios() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Relatórios - Visão Geral</h1>

      {/* Distribuição por tipo de evento */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Eventos por Tipo</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={eventosPorTipo}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {eventosPorTipo.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Receita mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Receita Mensal</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={receitaMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="receita" fill="#4F46E5" name="Receita" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Eventos por mês */}
      <Card>
        <CardHeader>
          <CardTitle>Quantidade de Eventos por Mês</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={eventosPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="eventos" stroke="#06B6D4" name="Eventos" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Taxa de ocupação */}
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Ocupação (%)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ocupacaoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="ocupacao" stroke="#F97316" name="Ocupação" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
