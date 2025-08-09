import { React, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Chip } from "@/components/ui/chip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterChip } from "@/components/ui/chip-filter";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  CalendarIcon
} from "lucide-react";
import { ChipRadio } from "@/components/ui/chip-radio";

const dias = [
  {
    nome: "Sexta",
    dados: [
      { local: "Acoty", locatario: "Sem locatário", data: "25/11/2025", hora: "11:30 - 17:30", status: "Livre" },
      { local: "Acoty", locatario: "Sem locatário", data: "25/11/2025", hora: "18:00 - 00:00", status: "Livre" },
      { local: "Avive", locatario: "Sem locatário", data: "10/12/2025", hora: "18:00 - 00:00", status: "Livre" },
    ],
  },
  {
    nome: "Sabado",
    dados: [
      { local: "Avive", locatario: "Sem locatário", data: "10/08/2025", hora: "17:30 - 23:30", status: "Livre" },
      { local: "Avive", locatario: "Sem locatário", data: "18/12/2025", hora: "17:30 - 23:30", status: "Livre" },
    ],
  },
  {
    nome: "Domingo",
    dados: [
      { local: "Avive", locatario: "Sem locatário", data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { local: "Avive", locatario: "Sem locatário", data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { local: "Avive", locatario: "Sem locatário", data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { local: "Avive", locatario: "Sem locatário", data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
    ],
  },
];

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const optionsChipRadio = [
  { value: "0", label: "Todos" },
  { value: "1", label: "Alocados" },
  { value: "2", label: "Disponiveis" },
];

const AgendaDisponivel = () => {
  const [local, setLocal] = useState("")
  const [inicio, setInicio] = useState<Date>()
  const [fim, setFim] = useState<Date>()
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([])
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [chips, setChips] = useState(["Acoty", "Aviva", "Dias Disponíveis"]);
  const [typeEvent, setTypeEvent] = useState<string>("2");

  const handleDelete = (chipToDelete: string) => {
    setChips((prev) => prev.filter((chip) => chip !== chipToDelete));
  };

  const toggleDia = (dia: string) => {
    setDiasSelecionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    )
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (month: number, year: number) => {
    setCurrentDate(new Date(year, month, 1));
    setShowDatePicker(false);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };

  const handleChipChange = (value: boolean, label: string) => {
    console.log(`Filtro "${label}" está ${value ? "ativado" : "desativado"}`);
  };

  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-primary">Dias disponiveis para evento</h1> */}
      <div className="flex items-center justify-between pb-2.5 pt-5">
        <ChipRadio
          name="dias"
          options={optionsChipRadio}
          value={typeEvent}
          onChange={(v) => setTypeEvent(v)}
          primaryColor="#D19F28"
        />
        <div className="flex items-center space-x-2 relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            style={{ '--tw-ring-color': '#D19F28' } as React.CSSProperties}
            className="relative border border-gray-300 focus:ring-2 focus:outline-none focus:border-transparent flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[200px] justify-center"
          >
            <span className="text-sm font-medium text-gray-800">
              {currentDate.getFullYear()}
            </span>
            <ChevronDown size={16} className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-600" />
          </button>

          {/* Date Picker Dropdown */}
          {showDatePicker && (
            <div className="absolute top-full transform mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[300px]">


              <div className="pt-4">
                <div className="grid grid-cols-3 gap-2">
                  {generateYearOptions().map((year) => (
                    <button
                      key={year}
                      onClick={() =>
                        handleDateSelect(currentDate.getMonth(), year)
                      }
                      className={`p-2 text-sm rounded-lg transition-colors ${year === currentDate.getFullYear()
                        ? "text-white"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                      style={
                        year === currentDate.getFullYear()
                          ? { backgroundColor: "#D19F28" }
                          : {}
                      }
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
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
                  {/* <Select onValueChange={setLocal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Acoty">Acoty</SelectItem>
                      <SelectItem value="Aviva">Aviva</SelectItem>
                    </SelectContent>
                  </Select> */}
                  <div className="flex gap-2 flex-wrap pb-2">
                    <FilterChip
                      label="Acoty"
                      onToggle={(val) => handleChipChange(val, "Acoty")}
                    />
                    <FilterChip
                      label="Avive"
                      onToggle={(val) => handleChipChange(val, "Avive")}
                    />
                  </div>
                </div>

                {/* Dias da semana */}
                <div className="pt-4 space-y-2">
                  <Label className="pb-2">Dias da Semana</Label>
                  <div className="flex gap-2 flex-wrap pb-2">
                    <FilterChip
                      label="Sexta"
                      onToggle={(val) => handleChipChange(val, "Sexta")}
                    />
                    <FilterChip
                      label="Sabado"
                      onToggle={(val) => handleChipChange(val, "Sabado")}
                    />
                    <FilterChip
                      label="Domingo"
                      onToggle={(val) => handleChipChange(val, "Domingo")}
                    />
                  </div>
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
        </div>
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
      {dias.map((dia) => (
        <div className="pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{`${dia.nome}`}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Local</TableHead>
                    <TableHead>Locatario</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dia.dados.map((item, index) => (
                    <TableRow
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-100 hover:bg-gray-50"
                      }
                    >
                      <TableCell className={item.local === 'Acoty' ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'}>{item.local}</TableCell>
                      <TableCell>{item.locatario}</TableCell>
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.hora}</TableCell>
                      <TableCell>
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline">Agendar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination className="mt-8 justify-end">
                <div className="text-muted-foreground flex-1 text-sm">
                  3 itens no total
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
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AgendaDisponivel;
