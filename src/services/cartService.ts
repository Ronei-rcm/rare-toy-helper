import { supabase } from '../integrations/supabase/client';
import { Product } from './productService';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export const cartService = {
  async getCartItems(userId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          *,
          category:categories(id, name, slug)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CartItem[];
  },

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    // Primeiro, buscar o produto para pegar o preço atual
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('price')
      .eq('id', productId)
      .single();

    if (productError) throw productError;

    // Tentar inserir ou atualizar se já existir
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        quantity,
        price: product.price
      }, {
        onConflict: 'user_id,product_id'
      })
      .select();

    if (error) throw error;
    return data[0];
  },

  async updateCartItemQuantity(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeFromCart(userId, productId);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .select();

    if (error) throw error;
    return data[0];
  },

  async removeFromCart(userId: string, productId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
    return true;
  },

  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  },

  async getCartTotal(userId: string) {
    const items = await this.getCartItems(userId);
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  async getCartItemsCount(userId: string) {
    const items = await this.getCartItems(userId);
    return items.reduce((count, item) => count + item.quantity, 0);
  }
};