// src/pages/relatorios/overview.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

export default function RelatoriosOverview() {
  // Dados de exemplo
  const vendasPorMes = [
    { mes: "Jan", valor: 4000 },
    { mes: "Fev", valor: 3000 },
    { mes: "Mar", valor: 5000 },
    { mes: "Abr", valor: 2500 },
    { mes: "Mai", valor: 6000 },
  ];

  const distribuicaoCategorias = [
    { name: "Cabelo", value: 400 },
    { name: "Unhas", value: 300 },
    { name: "Barba", value: 200 },
    { name: "Maquiagem", value: 150 },
  ];

  const novosClientes = [
    { mes: "Jan", qtd: 50 },
    { mes: "Fev", qtd: 75 },
    { mes: "Mar", qtd: 60 },
    { mes: "Abr", qtd: 90 },
    { mes: "Mai", qtd: 120 },
  ];

  const receitaPorCanal = [
    { canal: "App", valor: 5000 },
    { canal: "Site", valor: 3500 },
    { canal: "Presencial", valor: 2000 },
  ];

  const coresCategorias = ["#3b82f6", "#ec4899", "#22c55e", "#f59e0b"];

  return (
    <div className="space-y-6 p-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 15.500</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">245</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1.230</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 63,27</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendasPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribuicaoCategorias}
                  cx="50%"
                  cy="50%"
                  label
                  outerRadius={100}
                  dataKey="value"
                >
                  {distribuicaoCategorias.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={coresCategorias[index % coresCategorias.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos menores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={novosClientes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="qtd" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita por Canal</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={receitaPorCanal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="canal" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
