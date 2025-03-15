
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  DollarSign,
  ChevronRight,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Componente para as estatísticas dos cards
const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  color 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  change?: { value: string; isPositive: boolean }; 
  color: string;
}) => {
  return (
    <Card className={`bg-gradient-to-br from-white to-${color}-50`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`h-8 w-8 rounded-full bg-${color}-100 flex items-center justify-center`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${change.isPositive ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
            {change.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {change.value} em relação ao mês anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Componente para os itens recentes
const RecentItem = ({ 
  id, 
  title, 
  subtitle, 
  value, 
  status, 
  link 
}: { 
  id: string; 
  title: string; 
  subtitle: string; 
  value: string; 
  status?: { label: string; color: string }; 
  link: string;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-none hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{value}</p>
            {status && (
              <span className={`inline-block text-xs px-1.5 py-0.5 rounded-full ${status.color}`}>
                {status.label}
              </span>
            )}
          </div>
        </div>
      </div>
      <Link to={link} className="ml-4 text-gray-400 hover:text-primary">
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default function AdminDashboard() {
  // Dados fictícios - seriam substituídos por dados reais
  const dashboardStats = {
    totalSales: "R$ 125.350,00",
    totalOrders: 347,
    totalProducts: 532,
    totalCustomers: 1253,
    recentGrowth: "+12,5%",
    salesChange: { value: "15,3%", isPositive: true },
    ordersChange: { value: "8,7%", isPositive: true },
    customersChange: { value: "5,2%", isPositive: true },
    productsChange: { value: "3,1%", isPositive: false }
  };

  // Pedidos recentes para exibição
  const recentOrders = [
    { id: "42178", customer: "João Silva", date: "10/06/2023", value: "R$ 459,90", status: { label: "Entregue", color: "bg-green-100 text-green-800" } },
    { id: "42179", customer: "Maria Oliveira", date: "11/06/2023", value: "R$ 129,90", status: { label: "Enviado", color: "bg-blue-100 text-blue-800" } },
    { id: "42180", customer: "Carlos Pereira", date: "12/06/2023", value: "R$ 899,90", status: { label: "Processando", color: "bg-yellow-100 text-yellow-800" } },
    { id: "42181", customer: "Ana Souza", date: "13/06/2023", value: "R$ 259,90", status: { label: "Pendente", color: "bg-red-100 text-red-800" } },
  ];

  // Produtos populares para exibição
  const popularProducts = [
    { id: "P001", name: "Action Figure Colecionável", category: "Action Figures", stock: "12 unidades", sales: "89 vendas" },
    { id: "P002", name: "Console Retrô Nintendo", category: "Videogames", stock: "5 unidades", sales: "45 vendas" },
    { id: "P003", name: "Boneca Vintage 1980", category: "Bonecas", stock: "8 unidades", sales: "37 vendas" },
    { id: "P004", name: "Kit Lego Espacial", category: "Blocos", stock: "15 unidades", sales: "29 vendas" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Visão geral do desempenho da sua loja</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total de Vendas" 
          value={dashboardStats.totalSales} 
          icon={<DollarSign className="h-4 w-4 text-purple-500" />} 
          change={dashboardStats.salesChange} 
          color="purple"
        />
        
        <StatCard 
          title="Pedidos" 
          value={dashboardStats.totalOrders.toString()} 
          icon={<ShoppingCart className="h-4 w-4 text-blue-500" />} 
          change={dashboardStats.ordersChange} 
          color="blue"
        />
        
        <StatCard 
          title="Produtos" 
          value={dashboardStats.totalProducts.toString()} 
          icon={<Package className="h-4 w-4 text-orange-500" />} 
          change={dashboardStats.productsChange} 
          color="orange"
        />
        
        <StatCard 
          title="Clientes" 
          value={dashboardStats.totalCustomers.toString()} 
          icon={<Users className="h-4 w-4 text-green-500" />} 
          change={dashboardStats.customersChange} 
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Pedidos Recentes</CardTitle>
              <CardDescription>Últimas transações da sua loja</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/pedidos">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y">
              {recentOrders.map(order => (
                <RecentItem 
                  key={order.id}
                  id={order.id}
                  title={`Pedido #${order.id}`}
                  subtitle={`${order.customer} • ${order.date}`}
                  value={order.value}
                  status={order.status}
                  link={`/admin/pedidos/${order.id}`}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t px-6 py-4">
            <Button variant="ghost" asChild className="w-full">
              <Link to="/admin/pedidos">Ver todos os pedidos</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Produtos Populares</CardTitle>
              <CardDescription>Produtos mais vendidos do seu catálogo</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/produtos">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y">
              {popularProducts.map(product => (
                <RecentItem 
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  subtitle={`${product.category} • ${product.stock}`}
                  value={product.sales}
                  link={`/admin/produtos/${product.id}`}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t px-6 py-4">
            <Button variant="ghost" asChild className="w-full">
              <Link to="/admin/produtos">Ver todos os produtos</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Vendas por período</CardTitle>
            <CardDescription>Análise comparativa dos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>O gráfico de vendas será exibido aqui</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tarefas Pendentes</CardTitle>
            <CardDescription>Ações que precisam de atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-md">
                <h4 className="font-medium mb-1 text-yellow-800">Estoque Baixo</h4>
                <p className="text-sm text-yellow-700 mb-2">3 produtos estão com estoque abaixo do mínimo.</p>
                <Button size="sm" variant="outline" className="w-full border-yellow-200 text-yellow-800 hover:bg-yellow-100">
                  Gerenciar Estoque
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium mb-1 text-blue-800">Pedidos para Aprovar</h4>
                <p className="text-sm text-blue-700 mb-2">5 pedidos aguardando aprovação.</p>
                <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-800 hover:bg-blue-100">
                  Revisar Pedidos
                </Button>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="font-medium mb-1 text-green-800">Avaliações Novas</h4>
                <p className="text-sm text-green-700 mb-2">12 avaliações recebidas esta semana.</p>
                <Button size="sm" variant="outline" className="w-full border-green-200 text-green-800 hover:bg-green-100">
                  Ver Avaliações
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
