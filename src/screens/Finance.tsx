import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { SlidersHorizontal } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    parcela: '5/10',
    vencimento: "10/08/2025",
    status: "Pendente",
  },
  {
    cliente: "Maria Costa",
    valor: "R$ 950,00",
    parcela: '8/10',
    vencimento: "05/08/2025",
    status: "Vencido",
  },
  {
    cliente: "Carlos Lima",
    valor: "R$ 2.300,00",
    parcela: '10/10',
    vencimento: "15/08/2025",
    status: "Pendente",
  },
  {
    cliente: "Lucas Gomes",
    valor: "R$ 2.300,00",
    parcela: '10/10',
    vencimento: "20/08/2025",
    status: "Pago",
  },
  {
    cliente: "Fabricio Oliveira",
    valor: "R$ 2.300,00",
    parcela: '12/12',
    vencimento: "20/08/2025",
    status: "Pago",
  },
];

type Budget = {
  local: string;
  tipo: string;
  locatario: string;
  dataContrato: string;
  dataEvento: string;
  hora: string;
  receitaTotal: number;
  totalDespesas: number;
  imposto: number;
  valorLiquido: number;
  status: string;
  totalParcelas: number;
  ParcelasPagas: number;
  valorPago: number;
  formaPagamento: 'A vista' | 'Parcelado',
  diaVencimento: number;
};

const locais = ["Acoty", "Avive"];
const tipos = ["Casamento", "Debutante", "Empresarial"];
const horas = ["11:30 - 17:30", "18:00 - 00:00"];
const locatarios = ["Lucas e Fiama", "Caroline e João", "Empresa XPTO", "Ana Clara"];
const status = ["Em andamento", "Cancelado", "Pendente", "Vencido"];
const statusColor: Record<string, string> = {
  "Pendente": "bg-yellow-100 text-yellow-800",
  "Vencido": "bg-red-100 text-red-800",
  "Em andamento": "bg-blue-100 text-blue-800",
  "Cancelado": "bg-gray-100 text-gray-800"
};

function gerarMock(qtd: number): Budget[] {
  const mocks: Budget[] = [];

  for (let i = 0; i < qtd; i++) {
    const receitaTotal = Math.floor(Math.random() * 20000) + 20000; // 20k a 40k
    const totalDespesas = Math.floor(Math.random() * 8000) + 5000; // 5k a 13k
    const imposto = Math.floor(Math.random() * 6000) + 2000; // 2k a 8k
    const valorLiquido = receitaTotal - totalDespesas - imposto;

    mocks.push({
      local: locais[Math.floor(Math.random() * locais.length)],
      tipo: tipos[Math.floor(Math.random() * tipos.length)],
      locatario: locatarios[Math.floor(Math.random() * locatarios.length)],
      dataContrato: "01 Mar 2024",
      dataEvento: "24 Nov 2025",
      hora: horas[Math.floor(Math.random() * horas.length)],
      receitaTotal,
      totalDespesas,
      imposto,
      valorLiquido,
      status: status[Math.floor(Math.random() * status.length)],
      totalParcelas: 12,
      ParcelasPagas: 8,
      valorPago: (receitaTotal / 12) * 8,
      formaPagamento: 'Parcelado',
      diaVencimento: 20,
    });
  }

  return mocks;
}

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatDate = (date: string) =>
  format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

const mockBudgets = gerarMock(15);

export default function Financeiro() {
  const [filtro, setFiltro] = useState("mensal");

  const Overview = () => {
    return (
      <div className="space-y-6 pt-2">
        <div className="flex justify-end items-center">
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
          <CardHeader>
            <CardTitle className="text-lg">
              Parcelas proximas do vencimento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor parcela</TableHead>
                  <TableHead>Parcela</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockParcelas.map((parcela, i) => (
                  <TableRow
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-100 hover:bg-gray-50"
                    }
                  >
                    <TableCell>{parcela.cliente}</TableCell>
                    <TableCell>{parcela.valor}</TableCell>
                    <TableCell>{parcela.parcela}</TableCell>
                    <TableCell>{parcela.vencimento}</TableCell>
                    <TableCell className="text-center">
                      <span className={
                        parcela.status === "Vencida"
                          ? "bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-medium"
                          : parcela.status === "Pendente" ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium"
                            : "bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                      }
                      >
                        {parcela.status}
                      </span>
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

  const Budges = () => {
    const [open, setOpen] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState<Budget | null>(null);

    const handleDetalhes = (item: Budget) => {
      setItemSelecionado(item);
      setOpen(true);
    };

    return (
      <div className="pt-2">

        <div className="flex justify-end pb-8">
          <Button onClick={() => { }} variant="outline">
            <div className="flex items-center justify-center gap-2.5"><SlidersHorizontal />Filtros</div>
          </Button>
        </div>

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Local</TableHead>
              <TableHead>Tipo do evento</TableHead>
              <TableHead>Locatario</TableHead>
              <TableHead>Data do contrato</TableHead>
              <TableHead>Data do evento</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Valor do contrato</TableHead>
              {/* <TableHead>Despesas</TableHead>
              <TableHead>Imposto</TableHead>
              <TableHead>Liquido</TableHead> */}
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBudgets.map((item, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-100 hover:bg-gray-50"
                }
              >
                <TableCell className={item.local === 'Acoty' ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'}>{item.local}</TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.locatario}</TableCell>
                <TableCell>{formatDate(item.dataContrato)}</TableCell>
                <TableCell>{formatDate(item.dataEvento)}</TableCell>
                <TableCell>{item.hora}</TableCell>
                <TableCell>{currency(item.receitaTotal)}</TableCell>
                {/* <TableCell>{currency(item.totalDespesas)}</TableCell>
                <TableCell>{currency(item.imposto)}</TableCell>
                <TableCell>{currency(item.valorLiquido)}</TableCell> */}
                <TableCell className="text-center">
                  <Badge
                    className={`rounded ${statusColor[item.status] ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" onClick={() => handleDetalhes(item)}>Detalhes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-8 justify-end">
          <div className="text-muted-foreground flex-1 text-sm">
            {mockBudgets.length} itens no total
          </div>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Orçamento</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <div>
              <Separator />
              {itemSelecionado ? (
                <div className="py-8">
                  {/* Seção: Informações Gerais */}
                  <div className="pb-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{itemSelecionado.tipo}</h3>
                      <Badge
                        className={`rounded ${statusColor[itemSelecionado.status] ?? "bg-gray-100 text-gray-800"}`}
                      >
                        {itemSelecionado.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Local: <span className="font-medium text-foreground">{itemSelecionado.local}</span>
                      </p>
                      <Button variant="ghost" className='text-primary hover:text-primary'>Ir para o evento</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Locatário:{" "}
                      <span className="font-medium text-foreground">{itemSelecionado.locatario}</span>
                    </p>
                  </div>

                  {/* Seção: Datas */}
                  <div className="grid grid-cols-2 gap-4 pt-8">
                    <div>
                      <p className="text-xs text-muted-foreground">Data do Contrato</p>
                      <p className="text-base">{formatDate(itemSelecionado.dataContrato)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Data do Evento</p>
                      <p className="text-base">{formatDate(itemSelecionado.dataEvento)}</p>
                      <p className="text-xs text-muted-foreground">Horário: {itemSelecionado.hora}</p>
                    </div>
                  </div>

                  {/* Seção: Pagamento */}
                  <div className="space-y-2 pt-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Forma de pagamento:</span>
                      <span className="font-normal">{itemSelecionado.formaPagamento}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">dia do vencimento da parcela:</span>
                      <span className="font-normal">{itemSelecionado.diaVencimento}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Parcela Pagas</span>
                      <span className="font-normal">{`${itemSelecionado.ParcelasPagas}/${itemSelecionado.totalParcelas}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-normal">
                      <span>Valor pago:</span>
                      <span className="font-medium">{currency(itemSelecionado.valorPago)}</span>
                    </div>
                  </div>


                  {/* Seção: Valores */}
                  <div className="space-y-2 pt-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Receita Total:</span>
                      <span className="font-medium">{currency(itemSelecionado.receitaTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total de Despesas:</span>
                      <span className="font-medium text-red-600">
                        {currency(itemSelecionado.totalDespesas)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Imposto:</span>
                      <span className="font-medium">{currency(itemSelecionado.imposto)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                      <span>Valor Líquido do contrato:</span>
                      <span className="text-green-600">{currency(itemSelecionado.valorLiquido)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Nenhum item selecionado.</p>
              )}
              <Separator />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Fechar</Button>
              </DialogClose>
              <Button variant={"default"}>Editar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    // <motion.div
    //   className="p-6 space-y-6"
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5 }}
    // >
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-primary">
        Financeiro
      </h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
          {/* <TabsTrigger value="reports">Relatórios</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview"><Overview /></TabsContent>
        <TabsContent value="orcamentos"><Budges /></TabsContent>
        {/* <TabsContent value="reports"><div>Seus relatórios</div></TabsContent> */}
      </Tabs>
    </div>
  );
}
