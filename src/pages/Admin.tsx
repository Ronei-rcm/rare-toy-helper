
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
  Home,
  AlertCircle,
  Film,
  Images,
  Wallet,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../components/admin/AdminDashboard";
import { ProductsManager } from "../components/admin/ProductsManager";
import CategoriesManager from "../components/admin/CategoriesManager";
import OrdersManager from "../components/admin/OrdersManager";
import CustomersManager from "../components/admin/CustomersManager";
import SettingsManager from "../components/admin/SettingsManager";
import RelatoriosManager from "../components/admin/RelatoriosManager";
import VideosManager from "../components/admin/VideosManager";
import CarouselManager from "../components/admin/CarouselManager";
import FinancialManager from "../components/admin/FinancialManager";
import EventsManager from "../components/admin/EventsManager";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
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
} from "../components/ui/sidebar";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [accessError, setAccessError] = useState("");

  // Verifica se o usuário está logado e se é admin
  useEffect(() => {
    if (loading) return;

    if (!user) {
      setAccessError("Você precisa fazer login para acessar esta área!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    if (!isAdmin) {
      setAccessError("Acesso não autorizado! Você não possui privilégios de administrador.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, loading, isAdmin, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Verificando acesso...</h2>
        </div>
      </div>
    );
  }

  if (accessError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Acesso Negado</AlertTitle>
            <AlertDescription>
              {accessError}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => navigate("/login")}>
              Voltar para Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                    onClick={() => setActiveTab("carousel")} 
                    isActive={activeTab === "carousel"}
                  >
                    <Images />
                    <span>Carrossel</span>
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
                    onClick={() => setActiveTab("videos")} 
                    isActive={activeTab === "videos"}
                  >
                    <Film />
                    <span>Vídeos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("financial")} 
                    isActive={activeTab === "financial"}
                  >
                    <Wallet />
                    <span>Financeiro</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("events")} 
                    isActive={activeTab === "events"}
                  >
                    <Calendar />
                    <span>Eventos</span>
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
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="md:hidden" />
                  <h1 className="text-2xl font-bold">{
                    activeTab === "dashboard" ? "Dashboard" :
                    activeTab === "products" ? "Gerenciar Produtos" :
                    activeTab === "categories" ? "Gerenciar Categorias" :
                    activeTab === "carousel" ? "Gerenciar Carrossel" :
                    activeTab === "orders" ? "Gerenciar Pedidos" :
                    activeTab === "customers" ? "Gerenciar Clientes" :
                    activeTab === "videos" ? "Gerenciar Vídeos" :
                    activeTab === "financial" ? "Gestão Financeira" :
                    activeTab === "events" ? "Gerenciar Eventos" :
                    activeTab === "relatorios" ? "Relatórios" :
                    "Configurações"
                  }</h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Olá, {user?.name || user?.email}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                {activeTab === "dashboard" && <AdminDashboard />}
                {activeTab === "products" && <ProductsManager />}
                {activeTab === "categories" && <CategoriesManager />}
                {activeTab === "carousel" && <CarouselManager />}
                {activeTab === "orders" && <OrdersManager />}
                {activeTab === "customers" && <CustomersManager />}
                {activeTab === "videos" && <VideosManager />}
                {activeTab === "financial" && <FinancialManager />}
                {activeTab === "events" && <EventsManager />}
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
