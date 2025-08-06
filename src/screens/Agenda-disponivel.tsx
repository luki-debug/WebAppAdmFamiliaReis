import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dias = [
  {
    nome: "Sexta",
    dados: [
      { data: "25/11/2025", hora: "11:30 - 17:30", status: "Livre" },
      { data: "25/11/2025", hora: "18:00 - 00:00", status: "Livre" },
      { data: "10/12/2025", hora: "18:00 - 00:00", status: "Livre" },
    ],
  },
  {
    nome: "Sabado",
    dados: [
      { data: "10/08/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "18/12/2025", hora: "17:30 - 23:30", status: "Livre" },
    ],
  },
  {
    nome: "Domingo",
    dados: [
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
      { data: "10/09/2025", hora: "17:30 - 23:30", status: "Livre" },
    ],
  },
];

const AgendaDisponivel = () => {
  return (
    <div>
      {dias.map((dia) => (
        <div className="pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{`${dia.nome}`}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dia.dados.map((item, index) => (
                    <TableRow
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-100 hover:bg-gray-50"
                      }
                    >
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.hora}</TableCell>
                      <TableCell>
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline">Agendar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AgendaDisponivel;
