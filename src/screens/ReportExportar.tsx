// src/pages/relatorios/exportar-relatorios.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";

// Dados de exemplo
const dadosRelatorios = [
  { id: 1, nome: "Vendas Mensais", tipo: "Financeiro", criadoEm: "2025-08-01" },
  { id: 2, nome: "Clientes Ativos", tipo: "Cadastro", criadoEm: "2025-08-05" },
  { id: 3, nome: "Vendas de serviços extras", tipo: "Financeiro", criadoEm: "2025-08-08" },
];

export default function ExportarRelatorios() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<any>(null);

  return (
    <div className="pt-8 space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosRelatorios.map((relatorio, index) => (
            <TableRow key={relatorio.id} className={
                  index % 2 === 0
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-100 hover:bg-gray-50"
                }>
              <TableCell>{relatorio.nome}</TableCell>
              <TableCell>{relatorio.tipo}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setFiltroSelecionado(relatorio)}
                    >
                      <div className="flex items-center justify-center gap-2.5"><SlidersHorizontal />Filtros</div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Filtro - {filtroSelecionado?.nome}
                      </DialogTitle>
                      <DialogDescription>
                        Configure os parâmetros de filtro para este relatório.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Aqui você pode colocar campos específicos de filtro */}
                      <input
                        type="text"
                        placeholder="Buscar..."
                        className="border rounded-md w-full p-2"
                      />
                      <Button>Aplicar Filtro</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
