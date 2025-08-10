import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "./ui/badge";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: "Casamento" | "Aniversario" | "Corporativo" | "Debutante";
  status: "Confirmado" | "Pendente" | "Cancelado";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Casamento Ana & Bruno",
    date: "2024-12-25",
    time: "19:00",
    location: "Acoty",
    type: "Casamento",
    status: "Confirmado",
  },
  {
    id: "2",
    title: "15 Anos da Sofia",
    date: "2024-12-10",
    time: "20:00",
    location: "Salão de Festas",
    type: "Debutante",
    status: "Pendente",
  },
  {
    id: "3",
    title: "Evento Corporativo TechCorp",
    date: "2024-12-18",
    time: "14:00",
    location: "Auditório",
    type: "Corporativo",
    status: "Confirmado",
  },
  {
    id: "4",
    title: "Bodas de Ouro Silva",
    date: "2024-12-05",
    time: "18:00",
    location: "Jardim",
    type: "Casamento",
    status: "Cancelado",
  },
  {
    id: "5",
    title: "Tech XT",
    date: "2024-12-23",
    time: "10:00",
    type: "Corporativo",
    status: "Confirmado",
  },
  {
    id: "6",
    title: "Lucas e Fiama",
    date: "2024-12-21",
    time: "14:00",
    type: "Casamento",
    status: "Confirmado",
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

const eventTypeColors = {
  Casamento: "bg-pink-100 text-pink-800 border-pink-200",
  Debutante: "bg-purple-100 text-purple-800 border-purple-200",
  Corporativo: "bg-blue-100 text-blue-800 border-blue-200",
  Aniversario: "bg-green-100 text-green-800 border-green-200",
};

const statusColors = {
  Confirmado: "bg-green-100 text-green-800",
  Cancelado: "bg-red-100 text-red-800",
  Pendente: "bg-yellow-100 text-yellow-800",
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = React.useState(false);

const formatDate = (date: string) => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockEvents.filter((event) => event.date === dateStr);
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

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-32 border border-gray-200 bg-gray-50"
        ></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className="h-32 border border-gray-200 bg-white p-2 overflow-hidden"
        >
          <div
            className={`text-sm font-medium mb-1 ${isToday
              ? "text-white bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center"
              : "text-gray-900"
              }`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 border ${eventTypeColors[event.type]
                  } relative`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l ${statusColors[event.status]
                    }`}
                ></div>
                <div className="ml-2 truncate font-medium">{event.title}</div>
                <div className="ml-2 text-xs opacity-75">{event.time}</div>
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-xs text-gray-500 font-medium">
                +{events.length - 3} mais
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen">
      <div className="pb-8 relative">
        <div className="flex items-center justify-end pt-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  style={{ "--tw-ring-color": "#D19F28" } as React.CSSProperties}
                  className="relative border border-gray-300 focus:ring-2 focus:outline-none focus:border-transparent flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[200px] justify-center"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </span>
                  <ChevronDown size={16} className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-600" />
                </button>
                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[300px]">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {monthNames.map((month, index) => (
                        <button
                          key={month}
                          onClick={() =>
                            handleDateSelect(index, currentDate.getFullYear())
                          }
                          className={`p-2 text-sm rounded-lg transition-colors ${index === currentDate.getMonth()
                            ? "text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                          style={
                            index === currentDate.getMonth()
                              ? { backgroundColor: "#D19F28" }
                              : {}
                          }
                        >
                          {month.substring(0, 3)}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
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
              </div>
            </div>
            <Button onClick={() => { }}>
              <div className="flex items-center justify-center gap-2.5">Novo evento</div>
            </Button>
          </div>
        </div>

        {/* Overlay to close date picker */}
        {showDatePicker && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDatePicker(false)}
          ></div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Calendar */}
        <div className="p-6">
          {/* Week days header */}
          <div className="grid grid-cols-7 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-gray-600 border-b border-gray-200"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0 border-l border-t border-gray-200">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      <Dialog open={selectedEvent ? true : false} onOpenChange={() => setSelectedEvent(null)}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da agenda{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div>
            <Separator />
              <div className="py-8">
                {/* Seção: Informações Gerais */}
                <div className="pb-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{selectedEvent?.type}</h3>
                    <Badge
                      className={`rounded ${selectedEvent && statusColors[selectedEvent.status]}`}
                    >
                      {selectedEvent?.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Local: <span className="font-medium text-foreground">{selectedEvent?.location}</span>
                    </p>
                    <Button variant="ghost" className='text-primary hover:text-primary'>Ir para o evento</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Locatário:{" "}
                    <span className="font-medium text-foreground">{selectedEvent?.title}</span>
                  </p>
                </div>

                {/* Seção: Datas */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  <div>
                    <p className="text-xs text-muted-foreground">Data do Evento</p>
                    <p className="text-base">{selectedEvent && formatDate(selectedEvent.date)}</p>
                    <p className="text-xs text-muted-foreground">Horário: {selectedEvent?.time}</p>
                  </div>
                </div>
              </div>
            <Separator />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
