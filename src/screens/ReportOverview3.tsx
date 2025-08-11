// src/pages/relatorios/overview.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from "recharts"

const vendasMensais = [
  { mes: "Jan", vendas: 4000 },
  { mes: "Fev", vendas: 3000 },
  { mes: "Mar", vendas: 5000 },
  { mes: "Abr", vendas: 4500 },
  { mes: "Mai", vendas: 6000 },
  { mes: "Jun", vendas: 7000 },
]

const categorias = [
  { name: "Casamento", value: 400 },
  { name: "Debuntante", value: 300 },
  { name: "Corporativo", value: 234 },
]
const coresCategorias = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

const topProdutos = [
  { produto: "Plataforma 360", vendas: 240 },
  { produto: "DJ", vendas: 221 },
  { produto: "Bar de Drinks", vendas: 229 },
  { produto: "Guarda-Chuvas", vendas: 200 },
]

const clientesAtivos = [
  { mes: "Jan", eventos: 100 },
  { mes: "Fev", eventos: 120 },
  { mes: "Mar", eventos: 140 },
  { mes: "Abr", eventos: 160 },
  { mes: "Mai", eventos: 180 },
  { mes: "Jun", eventos: 200 },
]

export default function RelatoriosOverview() {
  return (
    <div className="py-6 space-y-6">
      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 242.000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Eventos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">200</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Serviços Extras Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 1.250</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 32.000</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de vendas por mês */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendasMensais}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="vendas" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráficos lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pizza - Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categorias} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {categorias.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={coresCategorias[index % coresCategorias.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Barras - Produtos */}
        <Card>
          <CardHeader>
            <CardTitle>Top Serviços Extras</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProdutos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="produto" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Área - Clientes ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Eventos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={clientesAtivos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="eventos" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
