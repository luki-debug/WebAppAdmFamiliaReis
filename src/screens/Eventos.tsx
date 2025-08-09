import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FilterChip } from "@/components/ui/chip-filter";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Chip } from "@/components/ui/chip";
import { ChipRadio } from "@/components/ui/chip-radio";

type Eventos = {
    local: string;
    tipo: string;
    locatario: string;
    dataContrato: string;
    dataEvento: string;
    hora: string;
    status: string;
    pacote: string;
    servicosExtra: string[];
};

const locais = ["Acoty", "Avive"];
const tipos = ["Casamento", "Debutante", "Empresarial"];
const horas = ["11:30 - 17:30", "18:00 - 00:00"];
const locatarios = ["Lucas e Fiama", "Caroline e João", "Empresa XPTO", "Ana Clara"];
const status = ["Em andamento", "Cancelado", "Concluido", "Atrasado"];
const pacotes = ["Cardapio Prata", "Cardapio Ouro", "Cardapio Platina"];
const servicos = [["Bar de Drinks", "Pista Paris"], ["Bar de Drinks", "Plataforma 360", "Guarda Chuves decorados", "Love"], ["Arco de Flores"]];
const statusColor: Record<string, string> = {
    "Concluido": "bg-green-100 text-green-800",
    "Atrasado": "bg-red-100 text-red-800",
    "Em andamento": "bg-blue-100 text-blue-800",
    "Cancelado": "bg-gray-100 text-gray-800"
};

function gerarMock(qtd: number): Eventos[] {
    const mocks: Eventos[] = [];

    for (let i = 0; i < qtd; i++) {
        mocks.push({
            local: locais[Math.floor(Math.random() * locais.length)],
            tipo: tipos[Math.floor(Math.random() * tipos.length)],
            locatario: locatarios[Math.floor(Math.random() * locatarios.length)],
            dataContrato: "01 Mar 2024",
            dataEvento: "24 Nov 2025",
            hora: horas[Math.floor(Math.random() * horas.length)],
            status: status[Math.floor(Math.random() * status.length)],
            pacote: pacotes[Math.floor(Math.random() * pacotes.length)],
            servicosExtra: servicos[Math.floor(Math.random() * servicos.length)],
        });
    }

    return mocks;
}

const chips = ['Acoty']
const optionsChipRadio = [
    { value: "0", label: "Todos" },
    { value: "1", label: "Casamento" },
    { value: "2", label: "Debutante" },
    { value: "3", label: "Empresarial" },
];


const formatDate = (date: string) =>
    format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

const mockEventos = gerarMock(10);

const Overview = () => {
    const [open, setOpen] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState<Eventos | null>(null);
    const [inicio, setInicio] = useState<Date>()
    const [fim, setFim] = useState<Date>()
    const [typeEvent, setTypeEvent] = useState<string>("0");

    const handleDetalhes = (item: Eventos) => {
        setItemSelecionado(item);
        setOpen(true);
    };

    return (
        <div className="pt-5">
            <div className="flex items-center justify-between pb-2.5">
                <ChipRadio
                    name="dias"
                    options={optionsChipRadio}
                    value={typeEvent}
                    onChange={(v) => setTypeEvent(v)}
                    primaryColor="#D19F28"
                />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button onClick={() => { }} variant="outline">
                            <div className="flex items-center justify-center gap-2.5"><SlidersHorizontal />Filtros</div>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Filtros Avançados</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="space-y-4 pt-8">
                            <div className="space-y-2">
                                <Label className="pb-2">Local</Label>
                                <div className="flex gap-2 flex-wrap pb-2">
                                    <FilterChip
                                        label="Acoty"
                                        onToggle={(val) => { }}
                                    />
                                    <FilterChip
                                        label="Avive"
                                        onToggle={(val) => { }}
                                    />
                                </div>
                            </div>

                            {/* Dias da semana */}
                            <div className="pt-4 space-y-2">
                                <Label className="pb-2">Dias da Semana</Label>
                                <div className="flex gap-2 flex-wrap pb-2">
                                    <FilterChip
                                        label="Sexta"
                                        onToggle={(val) => { }}
                                    />
                                    <FilterChip
                                        label="Sabado"
                                        onToggle={(val) => { }}
                                    />
                                    <FilterChip
                                        label="Domingo"
                                        onToggle={(val) => { }}
                                    />
                                </div>
                                {/* <div className="flex flex-wrap gap-4">
                    {["Sexta", "Sábado", "Domingo"].map((dia) => (
                      <div className="flex items-center space-x-2" key={dia}>
                        <Checkbox
                          id={dia}
                          checked={diasSelecionados.includes(dia)}
                          onCheckedChange={() => toggleDia(dia)}
                        />
                        <Label htmlFor={dia}>{dia}</Label>
                      </div>
                    ))}
                  </div> */}
                            </div>

                            <div className="pt-4 space-y-2">
                                <Label className="pb-2">Selecionar status</Label>
                                <RadioGroup defaultValue="option-one">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one" />
                                        <Label htmlFor="option-one">Em andamento</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-two" id="option-two" />
                                        <Label htmlFor="option-two">Atrasado</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-three" id="option-three" />
                                        <Label htmlFor="option-three">Cancelado</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-four" id="option-four" />
                                        <Label htmlFor="option-four">Concluido</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Período */}
                            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                <div className="space-y-2">
                                    <Label className="pb-2">Data Início</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left">
                                                {inicio ? format(inicio, "dd/MM/yyyy") : <span>Escolher data</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Calendar mode="single" selected={inicio} onSelect={setInicio} />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label className="pb-2">Data Fim</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left">
                                                {fim ? format(fim, "dd/MM/yyyy") : <span>Escolher data</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Calendar mode="single" selected={fim} onSelect={setFim} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Aplicar Filtros</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {/* <Button onClick={() => { }} variant="outline">
                    <div className="flex items-center justify-center gap-2.5"><SlidersHorizontal />Filtros</div>
                </Button> */}
            </div>
            <div className="flex gap-2 flex-wrap pb-8">
                <div className="flex gap-2">
                    {chips.map((chip) => (
                        <Chip
                            key={chip}
                            label={chip}
                            onDelete={() => { }}
                        />
                    ))}
                </div>
            </div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Local</TableHead>
                        <TableHead>Tipo do evento</TableHead>
                        <TableHead>Locatario</TableHead>
                        <TableHead>Data do evento</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>pacote</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Ação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockEventos.map((item, index) => (
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
                            <TableCell>{formatDate(item.dataEvento)}</TableCell>
                            <TableCell>{item.hora}</TableCell>
                            <TableCell>{item.pacote}</TableCell>
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
                    {mockEventos.length} itens no total
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
                        <DialogTitle>Evento</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Separator />
                        {itemSelecionado ? (
                            <div className="py-8">
                                {/* Seção: Informações Gerais */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">{itemSelecionado.tipo}</h3>
                                        <Badge
                                            className={`rounded ${statusColor[itemSelecionado.status] ?? "bg-gray-100 text-gray-800"}`}
                                        >
                                            {itemSelecionado.status}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Local: <span className="font-medium text-foreground">{itemSelecionado.local}</span>
                                        </p>
                                        <Button variant="ghost" className='text-primary hover:text-primary'>Ir para o contrato</Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Locatário:{" "}
                                        <span className="font-medium text-foreground">{itemSelecionado.locatario}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Pacote: {" "}
                                        <span className="font-medium text-foreground">{itemSelecionado.pacote}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground pb-2">
                                        Serviços: {" "}
                                        {itemSelecionado.servicosExtra.map((item, index) => (
                                            <p className="text-sm text-muted-foreground">{item}</p>
                                        ))}
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
const Budges = () => {
    return (<div>Budges</div>)
}


export default function Financeiro() {

    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-primary">
                Eventos
            </h2>
            <Overview />
            {/* <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
                    <TabsTrigger value="reports">Relatórios</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><Overview /></TabsContent>
                <TabsContent value="orcamentos"><Budges /></TabsContent>
                <TabsContent value="reports"><div>Seus relatórios</div></TabsContent>
            </Tabs> */}
        </div>
    )
}