
import { Button } from './ui/button';

const agendaItems = [
  {
    title: 'Casamento Ana & Bruno',
    date: 'Sábado, 25/12 - 19:00',
    status: 'Confirmado',
    statusColor: 'text-green-600'
  },
  {
    title: 'Visita Técnica - Festa Infantil',
    date: 'Terça, 21/12 - 14:00',
    status: 'Pendente',
    statusColor: 'text-yellow-600'
  },
  {
    title: 'Reunião com fornecedor',
    date: 'Quinta, 23/12 - 10:00',
    status: 'Agendado',
    statusColor: 'text-blue-600'
  }
];

export function WeeklyAgenda() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className='flex justify-between'>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agenda da Semana</h3>
        <Button variant="ghost" className='text-primary hover:text-primary'>Ver todos</Button>
      </div>

      <div className="space-y-4">
        {agendaItems.map((item, index) => (
          <div key={index} className="border-l-4 pl-4 py-2" style={{ borderLeftColor: '#D19F28' }}>
            <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
            <p className="text-gray-600 text-xs mt-1">{item.date}</p>
            <p className={`text-xs font-medium mt-1 ${item.statusColor}`}>{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}