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

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: "wedding" | "birthday" | "corporate" | "meeting";
  status: "confirmed" | "pending" | "cancelled";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Casamento Ana & Bruno",
    date: "2024-12-25",
    time: "19:00",
    location: "Salão Principal",
    type: "wedding",
    status: "confirmed",
  },
  {
    id: "2",
    title: "15 Anos da Sofia",
    date: "2024-12-10",
    time: "20:00",
    location: "Salão de Festas",
    type: "birthday",
    status: "pending",
  },
  {
    id: "3",
    title: "Evento Corporativo TechCorp",
    date: "2024-12-18",
    time: "14:00",
    location: "Auditório",
    type: "corporate",
    status: "confirmed",
  },
  {
    id: "4",
    title: "Bodas de Ouro Silva",
    date: "2024-12-05",
    time: "18:00",
    location: "Jardim",
    type: "wedding",
    status: "cancelled",
  },
  {
    id: "5",
    title: "Reunião com fornecedor",
    date: "2024-12-23",
    time: "10:00",
    type: "meeting",
    status: "confirmed",
  },
  {
    id: "6",
    title: "Visita Técnica - Festa Infantil",
    date: "2024-12-21",
    time: "14:00",
    type: "meeting",
    status: "pending",
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
  wedding: "bg-pink-100 text-pink-800 border-pink-200",
  birthday: "bg-purple-100 text-purple-800 border-purple-200",
  corporate: "bg-blue-100 text-blue-800 border-blue-200",
  meeting: "bg-green-100 text-green-800 border-green-200",
};

const statusColors = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  cancelled: "bg-red-500",
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
            <Button onClick={() => { }} variant="default">
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedEvent.title}
              </h3>
              <div
                className={`w-3 h-3 rounded-full ${statusColors[selectedEvent.status]
                  }`}
              ></div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock size={16} />
                <span>
                  {selectedEvent.date} às {selectedEvent.time}
                </span>
              </div>

              {selectedEvent.location && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin size={16} />
                  <span>{selectedEvent.location}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${selectedEvent.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : selectedEvent.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {selectedEvent.status === "confirmed"
                    ? "Confirmado"
                    : selectedEvent.status === "pending"
                      ? "Pendente"
                      : "Cancelado"}
                </span>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Editar
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: "#D19F28" }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
