import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from "recharts"
import { DollarSign, TrendingUp, Users, Calendar, Download, Filter } from "lucide-react";
import ReportOverview3 from "@/screens/ReportOverview3";
import ReportOverview2 from "@/screens/ReportOverview2";
import ReportOverview4 from "@/screens/Report3";


const vendasMensais = [
  { mes: "Jan", vendas: 4000 },
  { mes: "Fev", vendas: 3000 },
  { mes: "Mar", vendas: 5000 },
  { mes: "Abr", vendas: 4500 },
  { mes: "Mai", vendas: 6000 },
  { mes: "Jun", vendas: 7000 },
]

const categorias = [
  { name: "Cabelo", value: 400 },
  { name: "Unha", value: 300 },
  { name: "Maquiagem", value: 300 },
  { name: "Barbearia", value: 200 },
]
const coresCategorias = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

const topProdutos = [
  { produto: "Corte Masculino", vendas: 240 },
  { produto: "Manicure", vendas: 221 },
  { produto: "Escova", vendas: 229 },
  { produto: "Sobrancelha", vendas: 200 },
]

const clientesAtivos = [
  { mes: "Jan", clientes: 100 },
  { mes: "Fev", clientes: 120 },
  { mes: "Mar", clientes: 140 },
  { mes: "Abr", clientes: 160 },
  { mes: "Mai", clientes: 180 },
  { mes: "Jun", clientes: 200 },
]


const Overview = () => {
  return (
    <div className="pt-2">
      <h3 className="text-xl font-bold">Visão Geral</h3>
      <p className="text-gray-500">Aqui você encontra informações gerais sobre o seu projeto.</p>
    </div>
  );
};

const RelatoriosOverview = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 32.400</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">200</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Serviços Prestados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1.250</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 52,00</p>
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
                  {categorias.map((entry, index) => (
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
            <CardTitle>Top Produtos Vendidos</CardTitle>
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
          <CardTitle>Tendência de Clientes Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={clientesAtivos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="clientes" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

type Report = {
  id: string;
  name: string;
};

const reports: Report[] = [
  { id: "1", name: "Vendas por Período" },
  { id: "2", name: "Estoque Atual" },
  { id: "3", name: "Clientes Ativos" },
  { id: "4", name: "Despesas Mensais" },
];

const ExportarRelatorios = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  function handleExportXLS(report: Report) {
    console.log(`Exportando XLS para: ${report.name}`);
    // Aqui entraria a chamada da API para exportar
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Exportar Relatórios</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filtros - {selectedReport?.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Data Inicial</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Data Final</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Outro Filtro</Label>
                      <Input placeholder="Digite algo" />
                    </div>
                    <Button onClick={() => console.log("Aplicar filtros")}>
                      Aplicar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => handleExportXLS(report)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar XLS
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


// const ExportarRelatorios = () => {
//   return (
//     <div className="pt-2">
//       <h3 className="text-xl font-bold">Exportar Relatórios</h3>
//       <p className="text-gray-500">Aqui você pode</p>
//       </div>
//   );
// };

export default function CronogramasPage() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Relatórios</h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orcamentos">Exportar Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ReportOverview4 />
        </TabsContent>
        <TabsContent value="orcamentos">
          <ExportarRelatorios />
        </TabsContent>
      </Tabs>
    </div>
  );
}
