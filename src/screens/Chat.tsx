import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion";
import { CheckCheck, Send } from 'lucide-react';

interface Message {
  from: 'client' | 'admin';
  text: string;
  hour: string;
}

type MockMessages = {
  [key: string]: Message[];
};

const mockClients = [
  { id: 1, name: "João Silva", message: 'Olá, gostaria de confirmar o horário.', time: '10:45', avatar: "JS", status: 1, count: 1 },
  { id: 2, name: "Maria Oliveira", message: "Claro, está confirmado para 15h.", time: 'Ontem', avatar: "MO", status: 0, count: 1 },
  { id: 3, name: "Carlos Pereira", message: "Quais formas de pagamento aceitam?", time: '2 dias atrás', avatar: "CP", status: 0, count: 1 },
];

const mockMessages: MockMessages = {
  1: [
    { from: "client", text: "Olá, gostaria de confirmar o horário.", hour: "Hoje 10:45" },
    { from: "admin", text: "Claro, está confirmado para 15h.", hour: "Hoje 10:50" },
  ],
  2: [{ from: "client", text: "Tem desconto à vista?", hour: "Ontem 05:50" }],
  3: [{ from: "client", text: "Quais formas de pagamento aceitam?", hour: "2 dias atrás 04:20" }],
};

export default function ChatPage() {
  const [selectedClientId, setSelectedClientId] = useState(1);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!selectedClientId || newMessage.trim() === "") return;

    const updated = {
      ...messages,
      [selectedClientId]: [
        ...(messages[selectedClientId] || []),
        { from: "admin", text: newMessage },
      ],
    };

    setMessages(updated);
    setNewMessage("");
  };

  const selectedMessages = selectedClientId ? messages[selectedClientId] || [] : [];

  return (
    <div className="flex bg-white">
      {/* Sidebar com lista de clientes */}
      <aside className="w-[500px] border-r border-gray-200 bg-gray-50 p-8">
        <h2 className="text-2xl font-bold text-primary pb-6">Clientes</h2>
        <ul className="space-y-2">
          {mockClients.map((client) => (
            <div className="space-y-2">
              <li
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`flex items-start space-x-3 cursor-pointer px-3 py-2 rounded-lg text-sm font-medium ${selectedClientId === client.id
                  ? "bg-[#D19F28] text-white"
                  : "hover:bg-gray-100 text-gray-800"
                  }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">{client.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{client.name}</h4>
                    <span className={` text-xs ${selectedClientId === client.id
                      ? "bg-[#D19F28] text-white"
                      : "hover:bg-gray-100 text-gray-500"
                      }`}>{client.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-normal mt-1 line-clamp-2 ${selectedClientId === client.id
                      ? "bg-[#D19F28] text-white"
                      : "hover:bg-gray-100 text-gray-600"
                      }`}>{client.message}</p>
                    {selectedClientId != client.id && (client.status === 0 ? <Badge className='size-14 rounded-full h-4 w-4 bg-primary'>{client.count}</Badge> : <CheckCheck className="text-blue-500" />)}
                  </div>
                </div>
              </li>
              <Separator />
            </div>
          ))}
        </ul>
      </aside>

      {/* Chat principal */}
      <main className="flex-1 flex flex-col h-[calc(100vh-90px)]">
        <Card className="flex flex-col flex-1 m-4 shadow-md">
          <CardContent className="flex flex-col flex-1 p-4 overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">{mockClients.find((c) => c.id === selectedClientId)?.avatar}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {mockClients.find((c) => c.id === selectedClientId)?.name}
              </h2>
            </div>
            <Separator />
            <ScrollArea className="flex-1 space-y-2 pr-2 overflow-y-auto my-4">
              {selectedMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className=""
                >
                  <div className="py-2">
                    <div className={`max-w-xs px-4 py-2 text-sm rounded-lg ${msg.from === "admin"
                      ? "ml-auto bg-primary/60 text-gray-900 rounded-tr-none"
                      : "mr-auto bg-gray-200 text-gray-800 rounded-tl-none"
                      }`}>{msg.text}</div>
                    <div className={`max-w-xs px-4 py-2.5 text-xs text-muted-foreground ${msg.from === "admin"
                      ? "ml-auto text-right"
                      : "mr-auto text-left"
                      }`}>{msg.hour}</div>
                  </div>
                </motion.div>
              ))}
            </ScrollArea>

            {/* Input para enviar mensagem */}
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSend} className="bg-primary text-white">
                <Send />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
