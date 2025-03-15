
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Package,
  Clock,
  Check,
  X
} from "lucide-react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type OrderStatus = "pendente" | "processando" | "enviado" | "entregue" | "cancelado";

interface Order {
  id: string;
  date: string;
  items: { id: string; name: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  trackingCode?: string;
}

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

export default function ClientArea() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [profile, setProfile] = useState({
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

  const handleSaveProfile = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    toast.success("Item removido da lista de desejos");
  };

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "processando": return "bg-blue-100 text-blue-800";
      case "enviado": return "bg-purple-100 text-purple-800";
      case "entregue": return "bg-green-100 text-green-800";
      case "cancelado": return "bg-red-100 text-red-800";
    }
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
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Minha Conta</CardTitle>
                  <CardDescription>Bem-vindo(a), {user.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="#meus-pedidos">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Meus Pedidos
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="#lista-desejos">
                        <Heart className="mr-2 h-4 w-4" />
                        Lista de Desejos
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="#meu-perfil">
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="#configuracoes">
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="pedidos">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
                  <TabsTrigger value="desejos">Lista de Desejos</TabsTrigger>
                  <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
                  <TabsTrigger value="config">Configurações</TabsTrigger>
                </TabsList>
                
                {/* Pedidos Tab */}
                <TabsContent value="pedidos">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-lg shadow-sm border">
                      <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
                      </div>
                      
                      <div className="divide-y">
                        {orders.length === 0 ? (
                          <div className="p-8 text-center">
                            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">Nenhum pedido encontrado</h3>
                            <p className="text-gray-500 mb-4">Você ainda não fez nenhum pedido em nossa loja.</p>
                            <Button asChild>
                              <Link to="/collection">Explorar Produtos</Link>
                            </Button>
                          </div>
                        ) : (
                          orders.map((order) => (
                            <div key={order.id} className="p-6">
                              <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div>
                                  <div className="flex items-center gap-3">
                                    <h3 className="font-semibold">Pedido #{order.id}</h3>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    Realizado em {new Date(order.date).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div className="text-right mt-2 md:mt-0">
                                  <p className="font-medium">R$ {order.total.toFixed(2)}</p>
                                  <Button variant="outline" size="sm" className="mt-2">
                                    Detalhes
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-4 space-y-3">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                ))}
                              </div>
                              
                              {order.trackingCode && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-start">
                                  <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium text-blue-700">Rastreio da entrega</p>
                                    <p className="text-sm">Código: {order.trackingCode}</p>
                                  </div>
                                </div>
                              )}
                              
                              {order.status === "entregue" && (
                                <div className="mt-4 text-right">
                                  <Button variant="outline" size="sm">
                                    Avaliar Produtos
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Lista de Desejos Tab */}
                <TabsContent value="desejos">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-lg shadow-sm border">
                      <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">Lista de Desejos</h2>
                      </div>
                      
                      <div className="p-6">
                        {wishlist.length === 0 ? (
                          <div className="text-center py-8">
                            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">Sua lista de desejos está vazia</h3>
                            <p className="text-gray-500 mb-4">Adicione itens à sua lista de desejos enquanto navega pela loja.</p>
                            <Button asChild>
                              <Link to="/collection">Explorar Produtos</Link>
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {wishlist.map((item) => (
                              <div key={item.id} className="flex border rounded-md overflow-hidden">
                                <div className="w-24 h-24 flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 p-4 flex flex-col">
                                  <div className="flex justify-between">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <button 
                                      onClick={() => handleRemoveFromWishlist(item.id)}
                                      className="text-gray-400 hover:text-red-500"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <p className="text-primary font-medium mt-1">R$ {item.price.toFixed(2)}</p>
                                  <div className="mt-auto pt-2">
                                    <Button size="sm" className="w-full">Adicionar ao Carrinho</Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Perfil Tab */}
                <TabsContent value="perfil">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-lg shadow-sm border">
                      <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">Meu Perfil</h2>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nome Completo
                                </label>
                                <Input 
                                  value={profile.name} 
                                  onChange={(e) => setProfile({...profile, name: e.target.value})} 
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                <Input 
                                  value={profile.email} 
                                  onChange={(e) => setProfile({...profile, email: e.target.value})} 
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Telefone
                                </label>
                                <Input 
                                  value={profile.phone} 
                                  onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Endereço</h3>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Logradouro
                                  </label>
                                  <Input 
                                    value={profile.address.street} 
                                    onChange={(e) => setProfile({
                                      ...profile, 
                                      address: {...profile.address, street: e.target.value}
                                    })} 
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Número
                                  </label>
                                  <Input 
                                    value={profile.address.number} 
                                    onChange={(e) => setProfile({
                                      ...profile, 
                                      address: {...profile.address, number: e.target.value}
                                    })} 
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Complemento
                                </label>
                                <Input 
                                  value={profile.address.complement} 
                                  onChange={(e) => setProfile({
                                    ...profile, 
                                    address: {...profile.address, complement: e.target.value}
                                  })} 
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Bairro
                                </label>
                                <Input 
                                  value={profile.address.neighborhood} 
                                  onChange={(e) => setProfile({
                                    ...profile, 
                                    address: {...profile.address, neighborhood: e.target.value}
                                  })} 
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cidade
                                  </label>
                                  <Input 
                                    value={profile.address.city} 
                                    onChange={(e) => setProfile({
                                      ...profile, 
                                      address: {...profile.address, city: e.target.value}
                                    })} 
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estado
                                  </label>
                                  <Input 
                                    value={profile.address.state} 
                                    onChange={(e) => setProfile({
                                      ...profile, 
                                      address: {...profile.address, state: e.target.value}
                                    })} 
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  CEP
                                </label>
                                <Input 
                                  value={profile.address.zipCode} 
                                  onChange={(e) => setProfile({
                                    ...profile, 
                                    address: {...profile.address, zipCode: e.target.value}
                                  })} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button onClick={handleSaveProfile}>
                            <Check className="mr-2 h-4 w-4" />
                            Salvar Alterações
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Configurações Tab */}
                <TabsContent value="config">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-lg shadow-sm border">
                      <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">Configurações</h2>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-md font-medium mb-4">Preferências de Email</h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="newsletter" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                                  Receber newsletter com novidades e promoções
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="order-updates" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="order-updates" className="ml-3 text-sm text-gray-700">
                                  Receber atualizações sobre meus pedidos
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="wishlist-updates" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="wishlist-updates" className="ml-3 text-sm text-gray-700">
                                  Receber notificações sobre itens da lista de desejos
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium mb-4">Segurança</h3>
                            <div className="space-y-4">
                              <Button variant="outline">Alterar Senha</Button>
                              <div>
                                <div className="flex items-center mb-2">
                                  <input 
                                    type="checkbox" 
                                    id="two-factor" 
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                  <label htmlFor="two-factor" className="ml-3 text-sm text-gray-700">
                                    Ativar autenticação de dois fatores
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500 ml-7">
                                  Adicione uma camada extra de segurança à sua conta exigindo mais que apenas uma senha para fazer login.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium mb-4">Privacidade</h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="cookies" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="cookies" className="ml-3 text-sm text-gray-700">
                                  Aceitar cookies para melhorar a experiência de navegação
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="data-analytics" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="data-analytics" className="ml-3 text-sm text-gray-700">
                                  Permitir análise de dados para recomendações personalizadas
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium mb-4">Feedback</h3>
                            <label className="block text-sm text-gray-700 mb-2">
                              Envie-nos suas sugestões ou reporte problemas
                            </label>
                            <Textarea 
                              placeholder="Digite sua mensagem aqui..."
                              className="mb-3"
                              rows={4}
                            />
                            <Button>Enviar Feedback</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
