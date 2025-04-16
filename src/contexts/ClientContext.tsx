
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClientContextType, User, Order, CartItem, WishlistItem, UserProfile } from '@/types/client';

// Create the context with a default value
const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
  initialData?: {
    orders?: Order[];
    wishlist?: WishlistItem[];
    cartItems?: CartItem[];
    profile?: UserProfile | null;
  };
}

// Provider component
export const ClientProvider = ({ children, initialData }: ClientProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialData?.orders || []);
  const [cart, setCart] = useState<CartItem[]>(initialData?.cartItems || []);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialData?.wishlist || []);
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Add to cart function
  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.productId === product.productId);
      
      if (existingProductIndex !== -1) {
        // Product exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantidade: updatedCart[existingProductIndex].quantidade + product.quantidade
        };
        return updatedCart;
      } else {
        // Product doesn't exist, add new
        return [...prevCart, product];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  // Update cart item quantity
  const updateCartItem = (productId: string, quantity: number) => {
    setCart(prevCart => prevCart.map(item => 
      item.productId === productId ? { ...item, quantidade: quantity } : item
    ));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Add to wishlist function
  const addToWishlist = (product: WishlistItem) => {
    setWishlist(prevWishlist => {
      // Check if product already exists
      if (prevWishlist.some(item => item.productId === product.productId)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  // Remove from wishlist function
  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.productId !== productId));
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price || item.preco || 0) * (item.quantity || item.quantidade || 0);
  }, 0);

  // Handle order details
  const handleOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  // Handle checkout complete
  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    clearCart();
    // Show success message or redirect to orders
  };

  const value: ClientContextType = {
    user,
    orders,
    cart,
    wishlist,
    activeTab,
    setActiveTab,
    selectedOrder,
    setSelectedOrder,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    checkout,
    setCheckout,
    // Additional properties for components
    cartItems: cart,
    profile: initialData?.profile || null,
    handleRemoveFromWishlist: removeFromWishlist,
    handleAddToCart: addToCart,
    handleRemoveFromCart: removeFromCart,
    handleUpdateCartItemQuantity: updateCartItem,
    handleOrderDetails,
    handleCheckout,
    cartTotal,
    isOrderDetailsOpen,
    setIsOrderDetailsOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    handleCheckoutComplete
  };

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};

// Custom hook to use the client context
export const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};
