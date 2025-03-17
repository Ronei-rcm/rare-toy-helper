
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Componentes refatorados
import ClientSidebar from "@/components/client/ClientSidebar";
import OrdersList from "@/components/client/orders/OrdersList";
import OrderDetailsDialog from "@/components/client/orders/OrderDetailsDialog";
import WishlistSection from "@/components/client/wishlist/WishlistSection";
import UserProfileSection from "@/components/client/profile/UserProfileSection";
import SettingsSection from "@/components/client/settings/SettingsSection";
import CartSection from "@/components/client/cart/CartSection";
import CheckoutDialog from "@/components/client/cart/CheckoutDialog";

// Tipos
import { Order, WishlistItem, UserProfile, CartItem } from "@/types/client";

// Mock de pedidos
const mockOrders: Order[] = [
  {
    id: "42178",
    date: "2023-07-15",
    items: [
      { id: "1", name: "Action Figure Star Wars - Darth Vader", quantity: 1, price: 149.90 },
      { id: "2", name: "LEGO Classic Space - Nave Espacial", quantity: 1, price: 299.90 }
    ],
    total: 449.80,
    status: "entregue",
    trackingCode: "BR4598712345"
  },
  {
    id: "38954",
    date: "2023-09-22",
    items: [
      { id: "3", name: "Boneca Vintage Colecionável", quantity: 1, price: 199.90 }
    ],
    total: 199.90,
    status: "enviado",
    trackingCode: "BR7821654987"
  },
  {
    id: "45678",
    date: "2023-11-05",
    items: [
      { id: "4", name: "Console Retrô com 500 Jogos", quantity: 1, price: 349.90 },
      { id: "5", name: "Controle Extra para Console Retrô", quantity: 2, price: 89.90 }
    ],
    total: 529.70,
    status: "processando"
  }
];

// Mock de lista de desejos
const mockWishlist = [
  { id: "w1", name: "Urso de Pelúcia Vintage Raro", price: 299.90, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { id: "w2", name: "Coleção Completa Star Wars 1977", price: 1299.90, image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { id: "w3", name: "Carro Miniatura Década de 60", price: 159.90, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }
];

// Mock do carrinho
const mockCartItems: CartItem[] = [
  { id: "c1", name: "Hot Wheels Edição Especial 50 Anos", price: 89.90, quantity: 2, image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { id: "c2", name: "Boneco Articulado Marvel - Homem de Ferro", price: 199.90, quantity: 1, image: "https://images.unsplash.com/photo-1608278047522-58806a6ac8b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }
];

export default function ClientArea() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist);
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });

  // Calcular o total do carrinho
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    // Verifica se o usuário está logado
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Você precisa estar logado para acessar esta página");
      navigate("/login");
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    // Preencher dados do perfil (simulação)
    setProfile({
      name: userData.name,
      email: userData.email,
      phone: "(11) 98765-4321",
      address: {
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Jardim Primavera",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      }
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout realizado com sucesso");
    navigate("/");
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    // Atualiza o localStorage com os novos dados do perfil
    if (user) {
      const updatedUser = { ...user, name: updatedProfile.name, email: updatedProfile.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setProfile(updatedProfile);
      toast.success("Perfil atualizado com sucesso!");
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    toast.success("Item removido da lista de desejos");
  };

  const handleAddToCart = (item: WishlistItem) => {
    // Verifica se o item já está no carrinho
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Se já existe, aumenta a quantidade
      handleUpdateCartItemQuantity(item.id, existingItem.quantity + 1);
    } else {
      // Se não existe, adiciona ao carrinho
      setCartItems([
        ...cartItems,
        { ...item, quantity: 1 }
      ]);
    }
    
    toast.success(`${item.name} adicionado ao carrinho`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removido do carrinho");
  };

  const handleUpdateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    // Simular criação de um novo pedido
    const newOrder: Order = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      date: new Date().toISOString().split('T')[0],
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: cartTotal,
      status: "pendente"
    };
    
    // Adicionar o novo pedido à lista
    setOrders([newOrder, ...orders]);
    
    // Limpar o carrinho
    setCartItems([]);
  };

  const handleOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  if (!user) {
    return null; // Será redirecionado no useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
              <ClientSidebar 
                userName={user.name} 
                onLogout={handleLogout} 
              />
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="pedidos">
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
                  <TabsTrigger value="desejos">Lista de Desejos</TabsTrigger>
                  <TabsTrigger value="carrinho">Meu Carrinho</TabsTrigger>
                  <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
                  <TabsTrigger value="config">Configurações</TabsTrigger>
                </TabsList>
                
                {/* Pedidos Tab */}
                <TabsContent value="pedidos">
                  <OrdersList 
                    orders={orders}
                    onViewDetails={handleOrderDetails}
                  />
                </TabsContent>
                
                {/* Lista de Desejos Tab */}
                <TabsContent value="desejos">
                  <WishlistSection
                    wishlist={wishlist}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                  />
                </TabsContent>
                
                {/* Carrinho Tab */}
                <TabsContent value="carrinho">
                  <CartSection
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateCartItemQuantity}
                    onCheckout={handleCheckout}
                  />
                </TabsContent>
                
                {/* Perfil Tab */}
                <TabsContent value="perfil">
                  <UserProfileSection
                    profile={profile}
                    onUpdateProfile={handleSaveProfile}
                  />
                </TabsContent>
                
                {/* Configurações Tab */}
                <TabsContent value="config">
                  <SettingsSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Modal de detalhes do pedido */}
      <OrderDetailsDialog
        isOpen={isOrderDetailsOpen}
        onOpenChange={setIsOrderDetailsOpen}
        order={selectedOrder}
      />
      
      {/* Modal de checkout */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        total={cartTotal}
        onCheckoutComplete={handleCheckoutComplete}
      />
    </div>
  );
}
