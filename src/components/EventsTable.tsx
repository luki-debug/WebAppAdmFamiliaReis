import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"

const events = [
  {
    local: 'Acoty',
    locatario: 'Casamento Ana & Bruno',
    date: '10/10/2025',
    hora: "11:30 - 17:30",
    status: 'Confirmado',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    local: 'Acoty',
    locatario: '15 Anos da Sofia',
    date: '11/10/2025',
    hora: "11:30 - 17:30",
    status: 'Pendente',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    local: 'Acoty',
    locatario: 'Evento Corporativo TechCorp',
    date: '12/10/2025',
    hora: "11:30 - 17:30",
    status: 'Confirmado',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    local: 'Avive',
    locatario: 'Bodas de Ouro Silva',
    date: '13/10/2025',
    hora: "11:30 - 17:30",
    status: 'Cancelado',
    statusColor: 'bg-red-100 text-red-800'
  },
  {
    local: 'Avive',
    locatario: 'Bodas de Ouro Silva',
    date: '14/10/2025',
    hora: "11:30 - 17:30",
    status: 'Cancelado',
    statusColor: 'bg-red-100 text-red-800'
  },
  {
    local: 'Avive',
    locatario: 'Bodas de Ouro Silva',
    date: '15/10/2025',
    hora: "11:30 - 17:30",
    status: 'Cancelado',
    statusColor: 'bg-red-100 text-red-800'
  }
];

export function EventsTable() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className='flex justify-between'>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proximos Eventos</h3>
        <Button variant="ghost" className='text-primary hover:text-primary'>Ver todos</Button>
      </div>

      <div className="overflow-x-auto">

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Local</TableHead>
              <TableHead>Locatario</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((item, index) => (
              <TableRow
                key={index}
                className="bg-white hover:bg-gray-50"
              // className={
              //   index % 2 === 0
              //     ? "bg-white hover:bg-gray-50"
              //     : "bg-gray-100 hover:bg-gray-50"
              // }
              >
                <TableCell className={item.local === 'Acoty' ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'}>{item.local}</TableCell>
                <TableCell>{item.locatario}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.hora}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Nome do Evento</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{event.locatario}</td>
                <td className="py-3 px-4 text-blue-600 font-medium">{event.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.statusColor}`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}