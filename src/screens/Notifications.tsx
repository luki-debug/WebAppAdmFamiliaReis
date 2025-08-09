import { Bell, MessageCircle, AlertTriangle, CheckCircle, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockNotificacoes = [
  {
    id: 1,
    tipo: "mensagem",
    titulo: "Nova mensagem de cliente",
    descricao: "João Silva enviou uma mensagem sobre o evento #123",
    data: "2025-08-06 14:20",
    icone: <MessageCircle className="text-primary" />,
  },
  {
    id: 2,
    tipo: "pagamento_proximo",
    titulo: "Parcela próxima do vencimento",
    descricao: "Parcela do evento #456 vence em 2 dias",
    data: "2025-08-05 09:10",
    icone: <AlertTriangle className="text-yellow-500" />,
  },
  {
    id: 3,
    tipo: "pagamento_vencido",
    titulo: "Pagamento vencido",
    descricao: "Pagamento do cliente Maria venceu ontem",
    data: "2025-08-04 08:00",
    icone: <AlertTriangle className="text-red-500" />,
  },
  {
    id: 4,
    tipo: "pagamento_recebido",
    titulo: "Pagamento recebido",
    descricao: "R$ 3.000 recebidos do cliente Pedro Oliveira",
    data: "2025-08-06 10:45",
    icone: <CheckCircle className="text-green-600" />,
  },
  {
    id: 5,
    tipo: "servico_extra",
    titulo: "Solicitação de serviço extra",
    descricao: "Cliente Camila deseja adicionar DJ ao pacote",
    data: "2025-08-06 13:05",
    icone: <PlusCircle className="text-blue-500" />,
  },
];

export default function Notificacoes() {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-2 mb-6">
        {/* <Bell className="text-primary" /> */}
        <h2 className="text-2xl font-bold text-primary">Notificações</h2>
      </div>

      <div className="grid gap-4">
        {mockNotificacoes.map((notificacao) => (
          <Card key={notificacao.id} className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                {notificacao.icone}
              </div>
              <div>
                <CardTitle className="text-base">{notificacao.titulo}</CardTitle>
                <Badge variant="outline" className="text-xs mt-1">
                  {new Date(notificacao.data).toLocaleString("pt-BR")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700 text-sm">
              {notificacao.descricao}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
