import React from 'react';
import { Search, User, Bell, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-2xl font-semibold text-gray-800">{title}</h1> */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Pesquise qualquer coisa"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent w-64"
            style={{ '--tw-ring-color': '#D19F28' } as React.CSSProperties}
          />
        </div>

        <div className="flex items-center space-x-5">

          <Button variant={'outline'} className="relative">
            <Badge className='absolute -top-1 -right-1 size-14 rounded-full h-4 w-4 bg-red-500'>3</Badge>
            <Bell />
          </Button>
          <Button variant={'outline'} className='relative'>
            <Badge className='absolute -top-1 -right-1 size-14 rounded-full h-4 w-4 bg-red-500'>5</Badge>
            <MessageCircle />
          </Button>
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}