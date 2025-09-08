import { supabase } from '../integrations/supabase/client';
import { CartItem } from './cartService';

export interface Order {
  id: string;
  user_id?: string;
  order_number: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method?: 'pix' | 'credit_card' | 'debit_card';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  product?: {
    id: string;
    name: string;
    image_url?: string;
  };
}

export interface CreateOrderData {
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address?: any;
  notes?: string;
  items: {
    product_id: string;
    quantity: number;
    unit_price: number;
  }[];
}

export const orderService = {
  async createOrder(orderData: CreateOrderData) {
    // Calcular total
    const total_amount = orderData.items.reduce(
      (total, item) => total + (item.unit_price * item.quantity), 
      0
    );

    // Criar pedido
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total_amount,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        shipping_address: orderData.shipping_address,
        notes: orderData.notes,
        status: 'pending',
        payment_status: 'pending'
      } as any)
      .select()
      .single();

    if (orderError) throw orderError;

    // Criar itens do pedido
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity
    }));

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) throw itemsError;

    return {
      ...order,
      order_items: items
    } as Order;
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(id, name, image_url)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data as Order;
  },

  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(id, name, image_url)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Order[];
  },

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data as Order;
  },

  async updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data as Order;
  }
};