import { supabase } from '@/integrations/supabase/client';

export interface PixPayment {
  id: string;
  order_id: string;
  pix_key: string;
  qr_code: string;
  amount: number;
  status: 'pending' | 'paid' | 'expired';
  expires_at: string;
  paid_at?: string;
  created_at: string;
}

export const pixService = {
  async createPixPayment(orderId: string, amount: number) {
    // Gerar chave PIX aleatória (simulação)
    const pixKey = `pix-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Gerar QR Code (simulação - em produção usaria uma API real)
    const qrCode = `00020126580014BR.GOV.BCB.PIX0136${pixKey}520400005303986540${amount.toFixed(2)}5802BR5925MUHL STORE6009SAO PAULO62070503***6304`;
    
    // Definir expiração (30 minutos)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    const { data, error } = await supabase
      .from('pix_payments')
      .insert({
        order_id: orderId,
        pix_key: pixKey,
        qr_code: qrCode,
        amount,
        expires_at: expiresAt.toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data as PixPayment;
  },

  async getPixPayment(paymentId: string) {
    const { data, error } = await supabase
      .from('pix_payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error) throw error;
    return data as PixPayment;
  },

  async getPixPaymentByOrder(orderId: string) {
    const { data, error } = await supabase
      .from('pix_payments')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) throw error;
    return data as PixPayment;
  },

  async confirmPixPayment(paymentId: string) {
    const { data, error } = await supabase
      .from('pix_payments')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data as PixPayment;
  },

  async expirePixPayment(paymentId: string) {
    const { data, error } = await supabase
      .from('pix_payments')
      .update({ status: 'expired' })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data as PixPayment;
  }
};