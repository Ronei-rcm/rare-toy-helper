
import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";

// Dados fictícios
const mockCustomers = [
  { id: "1", name: "João Silva", email: "joao.silva@example.com", phone: "(11) 98765-4321", orders: 5, totalSpent: 1299.50, joined: "2023-05-15" },
  { id: "2", name: "Maria Oliveira", email: "maria.oliveira@example.com", phone: "(21) 98765-4321", orders: 3, totalSpent: 789.90, joined: "2023-06-20" },
  { id: "3", name: "Pedro Santos", email: "pedro.santos@example.com", phone: "(31) 98765-4321", orders: 8, totalSpent: 2435.75, joined: "2023-02-10" },
  { id: "4", name: "Ana Costa", email: "ana.costa@example.com", phone: "(41) 98765-4321", orders: 2, totalSpent: 459.80, joined: "2023-09-05" },
  { id: "5", name: "Carlos Ferreira", email: "carlos.ferreira@example.com", phone: "(51) 98765-4321", orders: 1, totalSpent: 149.50, joined: "2023-10-01" },
];

export default function CustomersManager() {
  const [customers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
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
              <TableHead>Telefone</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Total Gasto</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>R$ {customer.totalSpent.toFixed(2)}</TableCell>
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
                              <TabsTrigger value="notes">Anotações</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="info">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Nome</p>
                                  <p className="text-sm">{customer.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Email</p>
                                  <p className="text-sm">{customer.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Telefone</p>
                                  <p className="text-sm">{customer.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Cadastro</p>
                                  <p className="text-sm">{new Date(customer.joined).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Pedidos</p>
                                  <p className="text-sm">{customer.orders}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Total Gasto</p>
                                  <p className="text-sm">R$ {customer.totalSpent.toFixed(2)}</p>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="orders">
                              <p className="text-sm text-gray-500 text-center py-4">
                                O histórico de pedidos será exibido aqui
                              </p>
                            </TabsContent>
                            
                            <TabsContent value="notes">
                              <div className="space-y-4">
                                <p className="text-sm text-gray-500">
                                  Nenhuma anotação para este cliente.
                                </p>
                                <Input placeholder="Adicionar uma anotação..." />
                                <Button variant="outline">Salvar Anotação</Button>
                              </div>
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
