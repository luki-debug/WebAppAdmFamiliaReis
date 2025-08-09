import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const messages = [
  {
    name: 'Ana Clara',
    message: 'Olá! Gostaria de confirmar o número de convidados...',
    time: '10:45',
    avatar: 'AC'
  },
  {
    name: 'Bruno Martins',
    message: 'Boa tarde, poderíamos agendar uma degustação do buffet?',
    time: 'Ontem',
    avatar: 'BM'
  },
  {
    name: 'Sofia Lima',
    message: 'Estou com uma dúvida sobre a decoração do salão.',
    time: '2 dias atrás',
    avatar: 'SL'
  }
];

export function RecentMessages() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className='flex justify-between'>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mensagens Recentes</h3>
        <Button variant="ghost" className='text-primary hover:text-primary'>Ver todos</Button>
      </div>


      <div className="space-y-4 pt-2.5">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">{message.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 text-sm">{message.name}</h4>
                <span className="text-gray-500 text-xs">{message.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{message.message}</p>
                <Badge className='size-14 rounded-full h-4 w-4 bg-primary'>3</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}