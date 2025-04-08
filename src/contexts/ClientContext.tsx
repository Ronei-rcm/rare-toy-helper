
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClientContextType, User, Order, CartItem, WishlistItem } from '../types/client';

// Create the context with a default value
const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Provider component
export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkout, setCheckout] = useState(false);

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

  const value = {
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
    setCheckout
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
