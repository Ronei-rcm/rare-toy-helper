import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userService } from "@/services/userService";
import { toast } from "sonner";

interface Customer {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
  createdAt: string;
}

export default function CustomersManager() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await userService.getUsers();
      setCustomers(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-gray-500">Gerencie sua base de clientes</p>
      </div>
      
      <div className="flex items-center w-full max-w-sm space-x-2 mb-6">
        <Input 
          type="search" 
          placeholder="Buscar clientes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.nome}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.tipo === 'admin' ? 'Administrador' : 'Cliente'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Perfil do Cliente</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Tabs defaultValue="info">
                            <TabsList className="mb-4">
                              <TabsTrigger value="info">Informações</TabsTrigger>
                              <TabsTrigger value="orders">Pedidos</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="info">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Nome</p>
                                  <p className="text-sm">{customer.nome}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Email</p>
                                  <p className="text-sm">{customer.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Tipo</p>
                                  <p className="text-sm">{customer.tipo === 'admin' ? 'Administrador' : 'Cliente'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <p className="text-sm">{customer.ativo ? 'Ativo' : 'Inativo'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Data de Cadastro</p>
                                  <p className="text-sm">{new Date(customer.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="orders">
                              <p className="text-sm text-gray-500 text-center py-4">
                                Histórico de pedidos será implementado em breve
                              </p>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
