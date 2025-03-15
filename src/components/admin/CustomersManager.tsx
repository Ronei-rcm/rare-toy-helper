
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

// Mock data
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
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-500">Manage your customer base</p>
      </div>
      
      <div className="flex items-center w-full max-w-sm space-x-2 mb-6">
        <Input 
          type="search" 
          placeholder="Search customers..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No customers found
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
                          <DialogTitle>Customer Profile</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Name</p>
                              <p className="text-sm">{customer.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm">{customer.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm">{customer.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Joined</p>
                              <p className="text-sm">{new Date(customer.joined).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Orders</p>
                              <p className="text-sm">{customer.orders}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Total Spent</p>
                              <p className="text-sm">R$ {customer.totalSpent.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h3 className="text-sm font-medium mb-2">Recent Orders</h3>
                            <p className="text-sm text-gray-500 text-center py-4">
                              Recent orders would be displayed here
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
