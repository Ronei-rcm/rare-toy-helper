
import { createContext, useContext, useState, ReactNode } from "react";
import { Order, WishlistItem, UserProfile, CartItem, ShippingOption, Coupon } from "@/types/client";

interface ClientContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  wishlist: WishlistItem[];
  setWishlist: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  selectedOrder: Order | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  isOrderDetailsOpen: boolean;
  setIsOrderDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveFromWishlist: (id: string) => void;
  handleAddToCart: (item: WishlistItem) => void;
  handleRemoveFromCart: (id: string) => void;
  handleUpdateCartItemQuantity: (id: string, quantity: number) => void;
  handleOrderDetails: (order: Order) => void;
  handleCheckout: () => void;
  handleCheckoutComplete: () => void;
  cartTotal: number;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: ReactNode; initialData: any }> = ({ 
  children, 
  initialData 
}) => {
  const [orders, setOrders] = useState<Order[]>(initialData.orders);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialData.wishlist);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialData.cartItems);
  const [profile, setProfile] = useState<UserProfile>(initialData.profile);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Calcular o total do carrinho
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
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
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
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

  return (
    <ClientContext.Provider
      value={{
        orders,
        setOrders,
        wishlist,
        setWishlist,
        cartItems,
        setCartItems,
        profile,
        setProfile,
        selectedOrder,
        setSelectedOrder,
        isOrderDetailsOpen,
        setIsOrderDetailsOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        handleRemoveFromWishlist,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateCartItemQuantity,
        handleOrderDetails,
        handleCheckout,
        handleCheckoutComplete,
        cartTotal
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};
