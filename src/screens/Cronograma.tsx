import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chip } from "@/components/ui/chip";

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

const Tarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { codigo: "T001", nome: "Escolher o espaço do evento", descricao: "Escolher entre Acoty ou Avive" },
    { codigo: "T002", nome: "Escolher cardápio", descricao: "Churrasco, Massas ou Peixes" },
    { codigo: "T003", nome: "Cronograma do evento", descricao: "Cronograma durante o evento" },
    { codigo: "T004", nome: "Listar convidados", descricao: "Informar convidados" },
    { codigo: "T005", nome: "Listar fornecedores", descricao: "Informar fornecedores" },
    { codigo: "T006", nome: "Escolher as músicas", descricao: "Músicas durante o cronograma do evento" },
  ]);
  const [codigo, setCodigo] = useState<string>("");
  const [novaTarefaNome, setNovaTarefaNome] = useState<string>("");
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState<string>("");
  const [open, setOpen] = useState(false);

  const adicionarTarefa = () => {
    if (!novaTarefaNome.trim() || !novaTarefaDescricao.trim()) return;

    setTarefas((prev) => [
      ...prev,
      {
        codigo: codigo,
        nome: novaTarefaNome,
        descricao: novaTarefaDescricao,
      },
    ]);

    // Limpar input
    setCodigo("");
    setNovaTarefaNome("");
    setNovaTarefaDescricao("");
    setOpen(false);
  };

  return (
    <div className="pt-2">

      <div className="flex justify-end items-center gap-5 pb-8">
        <Button onClick={() => { }} variant="outline">
          <div className="flex items-center justify-center gap-2.5"><SlidersHorizontal />Filtros</div>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              Criar Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Tarefa</DialogTitle>
            </DialogHeader>
            <div className="py-8 space-y-3">
              <div className="space-y-2">
                <Label>Código</Label>
                <Input placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Nome da tarefa</Label>
                <Input placeholder="Nome da tarefa" value={novaTarefaNome} onChange={(e) => setNovaTarefaNome(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Descrição da tarefa</Label>
                <Textarea placeholder="Descrição da tarefa" value={novaTarefaDescricao} onChange={(e) => setNovaTarefaDescricao(e.target.value)} />
              </div>

            </div>
            <DialogFooter>
              <Button onClick={adicionarTarefa}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tarefas</TableHead>
            <TableHead className="text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tarefas.map((cronograma, index) => (
            <TableRow key={cronograma.codigo} className={
              index % 2 === 0
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 hover:bg-gray-50"
            }>
              <TableCell>{cronograma.codigo}</TableCell>
              <TableCell>{cronograma.nome}</TableCell>
              <TableCell>{cronograma.descricao}</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" onClick={() => { }}>Detalhes</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Cronogramas = () => {
  const [cronogramas, setCronogramas] = useState<Cronograma[]>([
    {
      codigo: "CR001",
      nome: "Casamento",
      listaTarefas: [
        { codigo: "T001", nome: "Escolher o espaço do evento", descricao: "Escolher entre Acoty ou Avive" },
        { codigo: "T002", nome: "Escolher cardápio", descricao: "Churrasco, Massas ou Peixes" },
        { codigo: "T003", nome: "Cronograma do evento", descricao: "Cronograma durante o evento" },
        { codigo: "T004", nome: "Listar convidados", descricao: "Informar convidados" },
        { codigo: "T005", nome: "Listar fornecedores", descricao: "Informar fornecedores" },
        { codigo: "T006", nome: "Escolher as músicas", descricao: "Músicas durante o cronograma do evento" },
      ],
    },
    {
      codigo: "CR002",
      nome: "Debutante",
      listaTarefas: [
        { codigo: "T001", nome: "Escolher o espaço do evento", descricao: "Escolher entre Acoty ou Avive" },
        { codigo: "T002", nome: "Escolher cardápio", descricao: "Churrasco, Massas ou Peixes" },
        { codigo: "T003", nome: "Cronograma do evento", descricao: "Cronograma durante o evento" },
        { codigo: "T004", nome: "Listar convidados", descricao: "Informar convidados" },
        { codigo: "T005", nome: "Listar fornecedores", descricao: "Informar fornecedores" },
      ],
    },
    {
      codigo: "CR003",
      nome: "Empresarial",
      listaTarefas: [
        { codigo: "T001", nome: "Escolher o espaço do evento", descricao: "Escolher entre Acoty ou Avive" },
        { codigo: "T002", nome: "Escolher cardápio", descricao: "Churrasco, Massas ou Peixes" },
        { codigo: "T003", nome: "Cronograma do evento", descricao: "Cronograma durante o evento" },
        { codigo: "T004", nome: "Listar convidados", descricao: "Informar convidados" },
        { codigo: "T005", nome: "Listar fornecedores", descricao: "Informar fornecedores" },
      ],
    },
  ]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { codigo: "T001", nome: "Escolher o espaço do evento", descricao: "Escolher entre Acoty ou Avive" },
    { codigo: "T002", nome: "Escolher cardápio", descricao: "Churrasco, Massas ou Peixes" },
    { codigo: "T003", nome: "Cronograma do evento", descricao: "Cronograma durante o evento" },
    { codigo: "T004", nome: "Listar convidados", descricao: "Informar convidados" },
    { codigo: "T005", nome: "Listar fornecedores", descricao: "Informar fornecedores" },
    { codigo: "T006", nome: "Escolher as músicas", descricao: "Músicas durante o cronograma do evento" },
  ]);
  const [nome, setNome] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [tarefasSelected, setTarefasSelected] = useState<Tarefa[]>([]);
  const [tarefaSeleted, setTarefaSeleted] = useState<string>("");
  const [open, setOpen] = useState(false);

  const criarNovoCronograma = () => {
    if (!nome.trim()) return;
    setCronogramas((prev) => [
      ...prev,
      {
        codigo: codigo,
        nome: nome,
        listaTarefas: tarefasSelected ?? null,
      },
    ]);

    setCodigo("");
    setNome("");
    setTarefasSelected([]);
    setOpen(false);
  };

  const addTarefa = () => {
    const tarefa = tarefas.find(x => x.codigo === tarefaSeleted) ?? null

    if (tarefa) {
      setTarefasSelected((prev) => [...prev, tarefa]);
    }
  }

const removeTarefa= (chip: Tarefa ) => {
  if(chip){
    setTarefasSelected((prev) => prev.filter((t) => t.codigo !== chip.codigo));
  }
};

  return (
    <div className="pt-2">

      <div className="flex justify-end items-center gap-5 pb-8">
        <Button onClick={() => { }} variant="outline">
          <div className="flex items-center justify-center gap-2.5"><SlidersHorizontal />Filtros</div>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              Criar Cronograma
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Cronograma</DialogTitle>
            </DialogHeader>
            <div className="py-8 space-y-3">
              <div className="space-y-2">
                <Label>Código</Label>
                <Input placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Nome do cronograma</Label>
                <Input placeholder="Nome do cronograma" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Nome do cronograma</Label>
                <div className="flex items-center gap-5">
                  <Select defaultValue={tarefaSeleted} onValueChange={setTarefaSeleted}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tarefa" />
                    </SelectTrigger>
                    <SelectContent>
                      {tarefas.map((x, i) => (
                        <SelectItem value={x.codigo}>{x.codigo} - {x.descricao}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-green-100 text-green-800 hover:bg-green-200" size='icon' onClick={addTarefa}><Plus /></Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {tarefasSelected.map((chip, index) => (
                    <Chip
                      key={index}
                      label={`${chip.descricao}`}
                      onDelete={() => removeTarefa(chip)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={criarNovoCronograma}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tarefas</TableHead>
            <TableHead className="text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cronogramas.map((cronograma, index) => (
            <TableRow key={cronograma.codigo} className={
              index % 2 === 0
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 hover:bg-gray-50"
            }>
              <TableCell>{cronograma.codigo}</TableCell>
              <TableCell>{cronograma.nome}</TableCell>
              <TableCell>{cronograma.listaTarefas.map((t) => t.nome).join(", ")}</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" onClick={() => { }}>Detalhes</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function CronogramasPage() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">
          Cronogramas
        </h2>
        <div className="flex gap-2">


        </div>
      </div>
      <Tabs defaultValue="tarefa">
        <TabsList>
          <TabsTrigger value="tarefa">Tarefa</TabsTrigger>
          <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
        </TabsList>
        <TabsContent value="tarefa"><Tarefas /></TabsContent>
        <TabsContent value="cronograma"><Cronogramas /></TabsContent>
      </Tabs>

    </div>
  );
}
