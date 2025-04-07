
// Type declarations for client-related modules

declare module '@/types/client' {
  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: Address;
  }
  
  export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    shippingAddress: Address;
  }
  
  export interface WishlistItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    dateAdded: string;
  }
}

declare module '@/contexts/ClientContext' {
  import { CartItem, Order, User, WishlistItem } from '@/types/client';
  import React from 'react';
  
  export interface ClientContextType {
    user: User | null;
    cart: CartItem[];
    orders: Order[];
    wishlist: WishlistItem[];
    isAuthenticated: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateCartItemQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (itemId: string) => void;
    logout: () => void;
    selectedOrderId: string | null;
    setSelectedOrderId: (orderId: string | null) => void;
    isCheckoutOpen: boolean;
    setIsCheckoutOpen: (isOpen: boolean) => void;
  }
  
  export const ClientContext: React.Context<ClientContextType>;
  export const ClientProvider: React.FC<{ children: React.ReactNode }>;
}
