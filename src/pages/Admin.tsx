
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Folder
} from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ProductsManager from "@/components/admin/ProductsManager";
import CategoriesManager from "@/components/admin/CategoriesManager";
import OrdersManager from "@/components/admin/OrdersManager";
import CustomersManager from "@/components/admin/CustomersManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
                    <span>Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("categories")} 
                    isActive={activeTab === "categories"}
                  >
                    <Folder />
                    <span>Categories</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("orders")} 
                    isActive={activeTab === "orders"}
                  >
                    <ShoppingCart />
                    <span>Orders</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("customers")} 
                    isActive={activeTab === "customers"}
                  >
                    <Users />
                    <span>Customers</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab("settings")} 
                    isActive={activeTab === "settings"}
                  >
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="p-6">
              <SidebarTrigger className="mb-4" />
              <div className="bg-white p-6 rounded-lg shadow-sm">
                {activeTab === "dashboard" && <AdminDashboard />}
                {activeTab === "products" && <ProductsManager />}
                {activeTab === "categories" && <CategoriesManager />}
                {activeTab === "orders" && <OrdersManager />}
                {activeTab === "customers" && <CustomersManager />}
                {activeTab === "settings" && <SettingsManager />}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
