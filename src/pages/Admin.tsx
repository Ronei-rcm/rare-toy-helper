
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Folder,
  BarChart,
  LogOut,
  Home
} from "lucide-react";
import { toast } from "sonner";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ProductsManager from "@/components/admin/ProductsManager";
import CategoriesManager from "@/components/admin/CategoriesManager";
import OrdersManager from "@/components/admin/OrdersManager";
import CustomersManager from "@/components/admin/CustomersManager";
import SettingsManager from "@/components/admin/SettingsManager";
import RelatoriosManager from "@/components/admin/RelatoriosManager";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Verifica se o usuário está logado e se é admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "admin") {
        setUser(parsedUser);
      } else {
        // Se não for admin, redireciona para a tela de login
        toast.error("Acesso não autorizado!");
        navigate("/login");
      }
    } else {
      // Se não estiver logado, redireciona para a tela de login
      toast.error("Você precisa fazer login para acessar esta área!");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  if (!user) {
    return null; // Não renderiza nada enquanto verifica o login
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar>
            <SidebarHeader className="flex items-center justify-between px-4 py-2">
              <h2 className="text-xl font-bold">MUHLSTORE Admin</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("dashboard")} 
                    isActive={activeTab === "dashboard"}
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("products")} 
                    isActive={activeTab === "products"}
                  >
                    <Package />
                    <span>Produtos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("categories")} 
                    isActive={activeTab === "categories"}
                  >
                    <Folder />
                    <span>Categorias</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("orders")} 
                    isActive={activeTab === "orders"}
                  >
                    <ShoppingCart />
                    <span>Pedidos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("customers")} 
                    isActive={activeTab === "customers"}
                  >
                    <Users />
                    <span>Clientes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("relatorios")} 
                    isActive={activeTab === "relatorios"}
                  >
                    <BarChart />
                    <span>Relatórios</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("settings")} 
                    isActive={activeTab === "settings"}
                  >
                    <Settings />
                    <span>Configurações</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                  <span>Voltar para Home</span>
                </Link>
              </Button>
              <Button variant="destructive" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Deslogar</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-bold">{
                  activeTab === "dashboard" ? "Dashboard" :
                  activeTab === "products" ? "Gerenciar Produtos" :
                  activeTab === "categories" ? "Gerenciar Categorias" :
                  activeTab === "orders" ? "Gerenciar Pedidos" :
                  activeTab === "customers" ? "Gerenciar Clientes" :
                  activeTab === "relatorios" ? "Relatórios" :
                  "Configurações"
                }</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Olá, {user.name}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                {activeTab === "dashboard" && <AdminDashboard />}
                {activeTab === "products" && <ProductsManager />}
                {activeTab === "categories" && <CategoriesManager />}
                {activeTab === "orders" && <OrdersManager />}
                {activeTab === "customers" && <CustomersManager />}
                {activeTab === "relatorios" && <RelatoriosManager />}
                {activeTab === "settings" && <SettingsManager />}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
