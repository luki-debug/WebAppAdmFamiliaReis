import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const paginas = [
  "Dashboard",
  "Eventos",
  "Financeiro",
  "Mensagens",
  "Serviços",
  "Notificações",
  "Configurações",
];

const mockPerfis = [
  {
    nome: "Administrador",
    permissoes: {
      Dashboard: "editar",
      Eventos: "editar",
      Financeiro: "editar",
      Mensagens: "editar",
      Serviços: "editar",
      Notificações: "editar",
      Configurações: "editar",
    },
  },
  {
    nome: "Financeiro",
    permissoes: {
      Dashboard: "visualizar",
      Eventos: "visualizar",
      Financeiro: "editar",
      Mensagens: "visualizar",
      Serviços: "listar",
      Notificações: "listar",
      Configurações: "visualizar",
    },
  },
];

interface Perfil {
  nome: string;
  permissoes: Permissoes;
}

interface Permissoes {
  Dashboard: string;
  Eventos: string;
  Financeiro: string;
  Mensagens: string;
  Serviços: string;
  Notificações: string;
  Configurações: string;
}

export default function EspacoConfiguracao() {
  const [perfis, setPerfis] = useState<Perfil[]>(mockPerfis);
  const [novoPerfil, setNovoPerfil] = useState<Perfil>({
    nome: "",
    permissoes: {
      Dashboard: '',
      Eventos: '',
      Financeiro: '',
      Mensagens: '',
      Serviços: '',
      Notificações: '',
      Configurações: '',
    },
  });

  const handleChangePermissao = (pagina: string, permissao: string) => {
    if (pagina && permissao) {
      setNovoPerfil((prev) => ({
        ...prev,
        permissoes: {
          ...prev.permissoes,
          [pagina]: permissao,
        },
      }));
    }

  };

  const adicionarPerfil = () => {
    if (novoPerfil?.nome) {
      setPerfis([...perfis, novoPerfil]);
      setNovoPerfil({
        nome: "", permissoes: {
          Dashboard: '',
          Eventos: '',
          Financeiro: '',
          Mensagens: '',
          Serviços: '',
          Notificações: '',
          Configurações: '',
        }
      });
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-primary">
        Configurações do Espaço
      </h2>

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="perfis">Perfis</TabsTrigger>
        </TabsList>

        {/* Sessão de Perfis */}
        <TabsContent value="perfis">
          <div className="pt-2">
            <div className="flex justify-end items-center gap-5 pb-8">
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button>Novo Perfil</Button>
                  </DialogTrigger>
                  <DialogContent className="px-0">
                    <DialogHeader className="px-6">
                      <DialogTitle>Novo Perfil</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[450px] px-6">
                      <div className="grid gap-4 py-8">
                        <div className="grid gap-3">
                          <Label>Nome do Perfil</Label>
                          <Input
                            placeholder="Ex: Recepcionista"
                            value={novoPerfil?.nome || ''}
                            onChange={(e) =>
                              setNovoPerfil({
                                ...novoPerfil,
                                nome: e.target.value,
                              })
                            }
                          />
                        </div>

                        {paginas.map((pagina) => (
                          <div key={pagina}>
                            <div className="grid gap-4">
                              <Label className="font-semibold">{pagina}</Label>
                              <Select
                                onValueChange={(v) =>
                                  handleChangePermissao(pagina, v)
                                }
                              >
                                <SelectTrigger className="w-52">
                                  <SelectValue placeholder="Permissão" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="visualizar">
                                    Visualizar
                                  </SelectItem>
                                  <SelectItem value="listar">Listar</SelectItem>
                                  <SelectItem value="editar">Editar</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <DialogFooter className="px-6">
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <Button onClick={adicionarPerfil}>Salvar</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </div>

            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Ativado</TableHead>
                  <TableHead className="text-center">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {perfis.map((perfil, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{perfil.nome}</TableCell>
                    <TableCell>Ativado</TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" onClick={() => { }}>
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Sessão de Usuários */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                🛠️ Essa funcionalidade pode permitir o cadastro de usuários com
                perfis de acesso definidos.
              </p>
              {/* Para expandir: Adicionar formulário de cadastro de usuários */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
