import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ClientSidebar from "../components/client/ClientSidebar";
import ClientContent from "../components/client/ClientContent";
import ClientModals from "../components/client/ClientModals";
import { ClientProvider } from "../contexts/ClientContext";

// Tipos
import { Order, WishlistItem, UserProfile, CartItem } from "../types/client";

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
    }
  };

  // Prepare initial context data
  const initialContextData = {
    orders,
    wishlist,
    cartItems,
    profile
  };

  if (!user) {
    return null; // Será redirecionado no useEffect
  }

  return (
    <ClientProvider initialData={initialContextData}>
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
              <ClientContent onUpdateProfile={handleSaveProfile} />
            </div>
          </div>
        </main>
        
        <Footer />

        {/* Modals */}
        <ClientModals />
      </div>
    </ClientProvider>
  );
}
