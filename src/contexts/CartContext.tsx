import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cartService, CartItem as CartServiceItem } from '../services/cartService';
import { supabase } from '../integrations/supabase/client';

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  image_url?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load cart when user changes
  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [userId]);

  const loadCart = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const cartItems = await cartService.getCartItems(userId);
      const formattedItems = cartItems.map(item => ({
        id: item.product_id,
        nome: item.product.name,
        preco: Number(item.price),
        quantidade: item.quantity,
        image_url: item.product.image_url || undefined
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      toast.error('Erro ao carregar carrinho');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!userId) {
      toast.error('Faça login para adicionar produtos ao carrinho');
      return;
    }

    setIsLoading(true);
    try {
      await cartService.addToCart(userId, productId, quantity);
      await loadCart();
      toast.success('Produto adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      toast.error('Erro ao adicionar produto ao carrinho');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await cartService.removeFromCart(userId, productId);
      await loadCart();
      toast.success('Produto removido do carrinho!');
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      toast.error('Erro ao remover produto do carrinho');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await cartService.updateCartItemQuantity(userId, productId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      toast.error('Erro ao atualizar quantidade');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await cartService.clearCart(userId);
      setItems([]);
      toast.success('Carrinho limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error('Erro ao limpar carrinho');
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = items.reduce((total, item) => total + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isLoading,
      itemCount
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
