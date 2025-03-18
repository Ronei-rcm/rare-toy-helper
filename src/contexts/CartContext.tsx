import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantidade: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartFromDatabase();
  }, []);

  const loadCartFromDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/carrinho');
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    try {
      await axios.post('http://localhost:3002/api/carrinho', item);
      await loadCartFromDatabase();
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:3002/api/carrinho/${itemId}`);
      await loadCartFromDatabase();
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: number, quantidade: number) => {
    try {
      await axios.put(`http://localhost:3002/api/carrinho/${itemId}`, { quantidade });
      await loadCartFromDatabase();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:3002/api/carrinho');
      setItems([]);
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
