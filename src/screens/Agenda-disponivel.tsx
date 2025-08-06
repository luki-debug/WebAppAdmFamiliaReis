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
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";

const dias = [
  {
    nome: "Sexta",
    dados: [
      { data: "25/11/2025", hora: "11:30 - 17:30", status: "Livre" },
      { data: "25/11/2025", hora: "18:00 - 00:00", status: "Livre" },
      { data: "10/12/2025", hora: "18:00 - 00:00", status: "Livre" },
    ],
  },
  {
    nome: "Sabado",
    dados: [
      { data: "10/08/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "18/12/2025", hora: "17:30 - 23:30", status: "Livre" },
    ],
  },
  {
    nome: "Domingo",
    dados: [
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
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

const AgendaDisponivel = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return (
    <div>
      <div className="text-base pb-2">Selecione o ano</div>
      <div className="flex items-center justify-between pb-8">
        <div className="flex items-center space-x-2 relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            style={{ '--tw-ring-color': '#D19F28' } as React.CSSProperties}
            className="relative border border-gray-300 focus:ring-2 focus:outline-none focus:border-transparent flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[200px] justify-center"
          >
            <span className="text-lg font-medium text-gray-800">
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
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        year === currentDate.getFullYear()
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
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.hora}</TableCell>
                      <TableCell>
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
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
