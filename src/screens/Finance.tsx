import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarClock, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const mockChartData = [
  { name: "Jan", total: 8000 },
  { name: "Fev", total: 9500 },
  { name: "Mar", total: 7300 },
  { name: "Abr", total: 8800 },
  { name: "Mai", total: 10200 },
  { name: "Jun", total: 6700 },
];

const mockParcelas = [
  {
    cliente: "João Silva",
    valor: "R$ 1.200,00",
    vencimento: "10/08/2025",
    status: "Pendente",
  },
  {
    cliente: "Maria Costa",
    valor: "R$ 950,00",
    vencimento: "05/08/2025",
    status: "Vencida",
  },
  {
    cliente: "Carlos Lima",
    valor: "R$ 2.300,00",
    vencimento: "15/08/2025",
    status: "Pendente",
  },
];

export default function Financeiro() {
  const [filtro, setFiltro] = useState("mensal");

  return (
    // <motion.div
    //   className="p-6 space-y-6"
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5 }}
    // >
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: "#D19F28" }}>
          Financeiro
        </h1>
        <Select defaultValue={filtro} onValueChange={setFiltro}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mensal">Mensal</SelectItem>
            <SelectItem value="bimestral">Bimestral</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Receita Total", valor: "R$ 45.000,00" },
          { title: "A Receber", valor: "R$ 12.300,00" },
          { title: "Pagamentos Futuros", valor: "R$ 5.800,00" },
        ].map((card, i) => (
          //   <motion.div
          //     key={i}
          //     initial={{ opacity: 0, y: 10 }}
          //     animate={{ opacity: 1, y: 0 }}
          //     transition={{ delay: i * 0.2 }}
          //   >
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">{card.valor}</p>
            </CardContent>
          </Card>
          //   </motion.div>
        ))}
      </div>

      {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}> */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Receita ({filtro})</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#D19F28" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* </motion.div> */}

      {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}> */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-yellow-600" />
            Parcelas Pendentes e Vencidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-auto border text-sm">
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockParcelas.map((parcela, i) => (
                <TableRow
                  key={i}
                  className={
                    i % 2 === 0
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "hover:bg-gray-100"
                  }
                >
                  <TableCell>{parcela.cliente}</TableCell>
                  <TableCell>{parcela.valor}</TableCell>
                  <TableCell>{parcela.vencimento}</TableCell>
                  <TableCell
                    className={
                      parcela.status === "Vencida"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600"
                    }
                  >
                    {parcela.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* </motion.div> */}
      {/* </motion.div> */}
    </div>
  );
}
