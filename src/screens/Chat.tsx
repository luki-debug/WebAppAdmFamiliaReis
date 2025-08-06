import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const mockClients = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Oliveira" },
  { id: 3, name: "Carlos Pereira" },
];

const mockMessages = {
  1: [
    { from: "client", text: "Olá, gostaria de confirmar o horário." },
    { from: "admin", text: "Claro, está confirmado para 15h." },
  ],
  2: [{ from: "client", text: "Tem desconto à vista?" }],
  3: [{ from: "client", text: "Quais formas de pagamento aceitam?" }],
};

export default function ChatPage() {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(1);
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
    <div className="flex h-screen bg-white">
      {/* Sidebar com lista de clientes */}
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="text-lg font-bold text-[#D19F28] mb-4">Clientes</h2>
        <ul className="space-y-2">
          {mockClients.map((client) => (
            <li
              key={client.id}
              onClick={() => setSelectedClientId(client.id)}
              className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium ${
                selectedClientId === client.id
                  ? "bg-[#D19F28] text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              {client.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat principal */}
      <main className="flex-1 flex flex-col">
        <Card className="flex flex-col flex-1 m-4 shadow-md">
          <CardContent className="flex flex-col flex-1 p-4 overflow-hidden">
            <h2 className="text-xl font-semibold text-[#D19F28] mb-4">
              Chat com {mockClients.find((c) => c.id === selectedClientId)?.name}
            </h2>

            <ScrollArea className="flex-1 space-y-2 pr-2 overflow-y-auto max-h-[500px] mb-4">
              {selectedMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.from === "admin"
                      ? "ml-auto bg-[#D19F28] text-white"
                      : "mr-auto bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </ScrollArea>

            {/* Input para enviar mensagem */}
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSend} className="bg-[#D19F28] text-white">
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
