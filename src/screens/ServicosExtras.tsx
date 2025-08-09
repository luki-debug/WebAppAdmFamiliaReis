import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ChipRadio } from "@/components/ui/chip-radio";
import { Plus } from "lucide-react";
import barImage from "@/assets/bar.jpg";
import GuardaChuvasImage from "@/assets/guarda-chuvas.jpeg";
import DJImage from "@/assets/dj.jpg";
import ParisImage from "@/assets/paris.jpg";
import BuffetImage from "@/assets/buffet.jpg";
import DecoracaoImage from "@/assets/Decoracao.jpg";
import Plataforma360Image from "@/assets/360.png";
import { Label } from "@/components/ui/label"

type Servico = {
  id: number
  nome: string
  descricao: string
  preco: string
  imagem: string
  codigo: string
}

type Pacote = {
  id: number
  nome: string
  descricao: string
  preco: string
  servicos: string[]
}

const mockServicos: Servico[] = [
  { id: 1, codigo: "BAR01", nome: "Bar de Drinks", descricao: "Barman e coquetéis", preco: "R$ 2.000,00", imagem: barImage },
  { id: 2, codigo: "DEC01", nome: "Decoração com Guarda-Chuvas", descricao: "Temática suspensa", preco: "R$ 1.200,00", imagem: GuardaChuvasImage },
  { id: 3, codigo: "DJ01", nome: "DJ", descricao: "DJ com som e luz", preco: "R$ 3.500,00", imagem: DJImage },
  { id: 4, codigo: "PIS01", nome: "Pista Paris", descricao: "Pista iluminada estilo Paris", preco: "R$ 2.800,00", imagem: ParisImage },
  { id: 5, codigo: "BUF01", nome: "Buffet Completo", descricao: "Entradas, jantar e sobremesas", preco: "R$ 5.000,00", imagem: BuffetImage },
  { id: 6, codigo: "DEC02", nome: "Decoração da Cerimônia", descricao: "Flores, tapete e altar", preco: "R$ 1.800,00", imagem: DecoracaoImage },
  { id: 7, codigo: "PLA01", nome: "Plataforma 360", descricao: "Vídeo 360 para convidados", preco: "R$ 2.200,00", imagem: Plataforma360Image },
]

const mockPacotes: Pacote[] = [
  {
    id: 1,
    nome: "Pacote Casamento",
    descricao: "Ideal para casamentos completos",
    preco: "R$ 12.000,00",
    servicos: ["Buffet Completo", "Decoração do Espaço", "Decoração da Cerimônia", "DJ"],
  },
  {
    id: 2,
    nome: "Pacote Corporativo",
    descricao: "Perfeito para eventos empresariais",
    preco: "R$ 10.500,00",
    servicos: ["Buffet Completo", "Decoração Festiva", "DJ", "Plataforma 360"],
  },
]

export default function ServicosExtras() {
  const [servicos, setServicos] = useState<Servico[]>(mockServicos)
  const [pacotes] = useState<Pacote[]>(mockPacotes)
  const [filtro, setFiltro] = useState<string>("")

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [imagem, setImagem] = useState("")
  const [codigo, setCodigo] = useState("")
  const [open, setOpen] = useState(false)
  const [typeEvent, setTypeEvent] = useState<string>("0");

  const optionsChipRadio = [
    { value: "0", label: "Casamento" },
    { value: "1", label: "Debutante" },
    { value: "2", label: "Empresarial" },
    { value: 3, label: "Todos" }
  ];

  const adicionarServico = () => {
    if (!nome || !preco || !imagem || !codigo) return
    const novo: Servico = {
      id: servicos.length + 1,
      nome,
      descricao,
      preco,
      imagem,
      codigo,
    }
    setServicos([...servicos, novo])
    setNome("")
    setDescricao("")
    setPreco("")
    setImagem("")
    setCodigo("")
    setOpen(false)
  }

  const servicosFiltrados = filtro
    ? servicos.filter((s) =>
      s.nome.toLowerCase().includes(filtro.toLowerCase()) || s.codigo.toLowerCase().includes(filtro.toLowerCase())
    )
    : servicos

  return (
    <motion.div className="p-8 space-y-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Serviços Extras</h2>
      </div>

      <div className="flex justify-between">
        <ChipRadio
          name="dias"
          options={optionsChipRadio}
          value={typeEvent}
          onChange={(v) => setTypeEvent(v)}
          primaryColor="#D19F28"
        />
        <div className="flex gap-5">
          <Button variant="secondary">Novo Pacote</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="flex gap-2 items-center">
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Serviço</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <Label>Código</Label>
                <Input placeholder="Código (ex: DJ01)" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                <Label>Nome</Label>
                <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Label>Descrição</Label>
                <Textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <Label>Preço</Label>
                <Input placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                <Label>URL da Imagem</Label>
                <Input placeholder="URL da Imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
              </div>
              <DialogFooter>
                <Button onClick={adicionarServico}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* <div className="max-w-sm">
        <Input
          placeholder="Buscar por nome ou código"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="bg-white border-gray-300"
        />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {servicosFiltrados.map((servico) => (
          <Card key={servico.id} className="overflow-hidden p-0 pb-6">
            <img src={servico.imagem} alt={servico.nome} className="w-full h-[250px] object-cover object-top" />
            <CardHeader>
              <CardTitle className="text-lg">{servico.nome}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <p>{servico.descricao}</p>
              <p className="text-yellow-700 font-semibold">{servico.preco}</p>
              <p className="text-xs text-gray-500">Código: {servico.codigo}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PACOTES */}
      <div className="pt-10">
        <h2 className="text-2xl font-bold text-primary pb-6">Pacotes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pacotes.map((pacote) => (
            <Card key={pacote.id}>
              <CardHeader>
                <CardTitle>{pacote.nome}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>{pacote.descricao}</p>
                <p className="font-semibold text-yellow-700">{pacote.preco}</p>
                <ul className="list-disc ml-5 text-sm">
                  {pacote.servicos.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
