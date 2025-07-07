
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

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
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCartFromDatabase();
  }, []);

  const loadCartFromDatabase = async () => {
    setIsLoading(true);
    try {
      // Primeiro tenta carregar do localStorage
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setItems(JSON.parse(localCart));
      }
      
      // Tenta conectar com o backend
      const response = await axios.get('http://localhost:3002/api/carrinho');
      setItems(response.data);
      localStorage.setItem('cart', JSON.stringify(response.data));
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      // Usa dados do localStorage se backend não estiver disponível
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setItems(JSON.parse(localCart));
        toast.info('Carrinho carregado localmente. Algumas funcionalidades podem estar limitadas.');
      } else {
        toast.error('Não foi possível carregar seu carrinho.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: CartItem) => {
    setIsLoading(true);
    try {
      // Tenta adicionar via API
      await axios.post('http://localhost:3002/api/carrinho', item);
      await loadCartFromDatabase();
      toast.success('Produto adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      // Fallback: adiciona localmente
      const existingItem = items.find(i => i.id === item.id);
      let newItems;
      if (existingItem) {
        newItems = items.map(i => 
          i.id === item.id 
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        );
      } else {
        newItems = [...items, item];
      }
      setItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
      toast.success('Produto adicionado ao carrinho!');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3002/api/carrinho/${itemId}`);
      await loadCartFromDatabase();
      toast.success('Produto removido do carrinho!');
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      toast.error('Não foi possível remover o produto do carrinho.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantidade: number) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:3002/api/carrinho/${itemId}`, { quantidade });
      await loadCartFromDatabase();
      toast.success('Quantidade atualizada!');
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      toast.error('Não foi possível atualizar a quantidade do produto.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await axios.delete('http://localhost:3002/api/carrinho');
      setItems([]);
      toast.success('Carrinho limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error('Não foi possível limpar o carrinho.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isLoading 
    }}>
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
