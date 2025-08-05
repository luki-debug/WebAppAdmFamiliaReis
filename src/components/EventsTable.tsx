import React from 'react';

const events = [
  {
    name: 'Casamento Ana & Bruno',
    date: '25.12.24',
    status: 'Confirmado',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    name: '15 Anos da Sofia',
    date: '10.12.24',
    status: 'Pendente',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    name: 'Evento Corporativo TechCorp',
    date: '18.12.24',
    status: 'Confirmado',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    name: 'Bodas de Ouro Silva',
    date: '05.12.24',
    status: 'Cancelado',
    statusColor: 'bg-red-100 text-red-800'
  }
];

export function EventsTable() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Proximos Eventos</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
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
                <td className="py-3 px-4 text-gray-900">{event.name}</td>
                <td className="py-3 px-4 text-blue-600 font-medium">{event.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.statusColor}`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}