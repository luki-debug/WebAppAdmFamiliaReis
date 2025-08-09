import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

// Tipos
type Tarefa = {
  codigo: string;
  nome: string;
  descricao: string;
};

type Cronograma = {
  codigo: string;
  nome: string;
  listaTarefas: Tarefa[];
};

export default function CronogramasPage() {
  const [cronogramas, setCronogramas] = useState<Cronograma[]>([
    {
      codigo: "CR001",
      nome: "Casamento Maria & João",
      listaTarefas: [
        { codigo: "T001", nome: "Montar Palco", descricao: "Instalação do palco e som" },
        { codigo: "T002", nome: "Decoração", descricao: "Flores e iluminação" },
      ],
    },
    {
      codigo: "CR002",
      nome: "Festa de Aniversário - Pedro",
      listaTarefas: [
        { codigo: "T003", nome: "Montar Mesas", descricao: "Organizar mesas e cadeiras" },
      ],
    },
  ]);

  const [novoCronogramaNome, setNovoCronogramaNome] = useState("");
  const [cronogramaSelecionado, setCronogramaSelecionado] = useState<string | null>(null);
  const [novaTarefaNome, setNovaTarefaNome] = useState("");
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState("");

  const criarNovoCronograma = () => {
    if (!novoCronogramaNome.trim()) return;
    setCronogramas((prev) => [
      ...prev,
      {
        codigo: `CR${Math.floor(Math.random() * 10000)}`,
        nome: novoCronogramaNome,
        listaTarefas: [],
      },
    ]);
    setNovoCronogramaNome("");
  };

  const adicionarTarefa = () => {
    if (!novaTarefaNome.trim() || !novaTarefaDescricao.trim() || !cronogramaSelecionado) return;
    setCronogramas((prev) =>
      prev.map((c) =>
        c.codigo === cronogramaSelecionado
          ? {
              ...c,
              listaTarefas: [
                ...c.listaTarefas,
                {
                  codigo: `T${Math.floor(Math.random() * 10000)}`,
                  nome: novaTarefaNome,
                  descricao: novaTarefaDescricao,
                },
              ],
            }
          : c
      )
    );
    setNovaTarefaNome("");
    setNovaTarefaDescricao("");
    setCronogramaSelecionado(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cronogramas</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus size={18} /> Criar Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Tarefa</DialogTitle>
              </DialogHeader>
              <Input placeholder="Nome da tarefa" value={novaTarefaNome} onChange={(e) => setNovaTarefaNome(e.target.value)} />
              <Textarea placeholder="Descrição da tarefa" value={novaTarefaDescricao} onChange={(e) => setNovaTarefaDescricao(e.target.value)} />
              <DialogFooter>
                <Button onClick={adicionarTarefa}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={18} /> Criar Cronograma
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Cronograma</DialogTitle>
              </DialogHeader>
              <Input placeholder="Nome do cronograma" value={novoCronogramaNome} onChange={(e) => setNovoCronogramaNome(e.target.value)} />
              <DialogFooter>
                <Button onClick={criarNovoCronograma}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tarefas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cronogramas.map((cronograma) => (
            <TableRow key={cronograma.codigo}>
              <TableCell>{cronograma.codigo}</TableCell>
              <TableCell>{cronograma.nome}</TableCell>
              <TableCell>{cronograma.listaTarefas.map((t) => t.nome).join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
