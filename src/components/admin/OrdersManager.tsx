
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Search, Eye, Filter } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";

// Dados fictícios
const mockOrders = [
  { id: "#PED-5624", customer: "João Silva", date: "2023-10-15", status: "completed", total: 349.90, items: 3 },
  { id: "#PED-5623", customer: "Maria Oliveira", date: "2023-10-14", status: "processing", total: 129.50, items: 1 },
  { id: "#PED-5622", customer: "Pedro Santos", date: "2023-10-14", status: "completed", total: 589.75, items: 4 },
  { id: "#PED-5621", customer: "Ana Costa", date: "2023-10-13", status: "shipped", total: 219.90, items: 2 },
  { id: "#PED-5620", customer: "Carlos Ferreira", date: "2023-10-12", status: "cancelled", total: 149.50, items: 1 },
];

export default function OrdersManager() {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">Em Processamento</Badge>;
      case "shipped":
        return <Badge className="bg-yellow-500">Enviado</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <p className="text-gray-500">Gerencie os pedidos dos clientes</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input 
            type="search" 
            placeholder="Buscar pedidos por ID ou cliente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="processing">Em Processamento</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum pedido encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido - {order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Cliente</p>
                              <p className="text-sm">{order.customer}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Data</p>
                              <p className="text-sm">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Status</p>
                              <p className="text-sm">{getStatusBadge(order.status)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Total</p>
                              <p className="text-sm">R$ {order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Itens do Pedido</h3>
                            <p className="text-sm text-gray-500 text-center py-4">
                              Os itens do pedido seriam exibidos aqui
                            </p>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Informações de Entrega</h3>
                            <p className="text-sm text-gray-500 text-center py-4">
                              As informações de entrega seriam exibidas aqui
                            </p>
                          </div>
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
