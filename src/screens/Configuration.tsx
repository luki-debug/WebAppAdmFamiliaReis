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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Plus } from "lucide-react";

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

export default function EspacoConfiguracao() {
  const [perfis, setPerfis] = useState(mockPerfis);
  const [novoPerfil, setNovoPerfil] = useState({
    nome: "",
    permissoes: {} as Record<string, string>,
  });

  const handleChangePermissao = (pagina: string, permissao: string) => {
    setNovoPerfil((prev) => ({
      ...prev,
      permissoes: {
        ...prev.permissoes,
        [pagina]: permissao,
      },
    }));
  };

  const adicionarPerfil = () => {
    if (novoPerfil.nome) {
      setPerfis([...perfis, novoPerfil]);
      setNovoPerfil({ nome: "", permissoes: {} });
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

          <div className="grid grid-cols-5 grid-rows-2 gap-4">
            <div className="col-span-4 row-span-2">
              <Card className="flex flex-1 h-100">
                <CardHeader>
                  <CardTitle>Perfis Cadastrados</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        {paginas.map((p) => (
                          <TableHead key={p}>{p}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {perfis.map((perfil, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{perfil.nome}</TableCell>
                          {paginas.map((p) => (
                            <TableCell key={p}>
                              {perfil.permissoes[p] ?? "-"}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 row-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Perfis de Acesso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome do Perfil</Label>
                      <Input
                        placeholder="Ex: Recepcionista"
                        value={novoPerfil.nome}
                        onChange={(e) =>
                          setNovoPerfil({ ...novoPerfil, nome: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {paginas.map((pagina) => (
                      <div key={pagina}>
                        <Label className="font-semibold">{pagina}</Label>
                        <Select
                          onValueChange={(v) => handleChangePermissao(pagina, v)}
                        >
                          <SelectTrigger className="w-52">
                            <SelectValue placeholder="Permissão" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visualizar">Visualizar</SelectItem>
                            <SelectItem value="listar">Listar</SelectItem>
                            <SelectItem value="editar">Editar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>

                  <Button className="mt-4" onClick={adicionarPerfil}>
                    Adicionar Perfil
                  </Button>
                </CardContent>
              </Card>
            </div>
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
