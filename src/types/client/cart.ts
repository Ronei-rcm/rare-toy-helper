// Cart and Order related types
import { Address } from './address';

// Cart item type
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  quantidade: number;  // Added for backward compatibility
  image?: string;
  maxQuantity?: number;
  nome?: string;       // Added for backward compatibility
  preco?: number;      // Added for backward compatibility
  imagem?: string;     // Added for backward compatibility
}

// Order status
export type OrderStatus = 
  | "pending"     // Order created but not paid
  | "processing"  // Order paid and being processed
  | "shipped"     // Order has been shipped
  | "delivered"   // Order has been delivered
  | "completed"   // Order complete (after any return period)
  | "cancelled"   // Order cancelled
  | "refunded"    // Order refunded
  | "pendente"    // Brazilian Portuguese versions
  | "processando"
  | "enviado"
  | "entregue"
  | "cancelado";

// Payment method
export type PaymentMethod = 
  | "credit_card"
  | "debit_card"
  | "pix"
  | "boleto"
  | "paypal";

// Order
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  shippingCost?: number;
  discount?: number;
  paymentMethod?: PaymentMethod;
  shippingAddress?: Address;
  createdAt?: string;
  updatedAt?: string;
  date?: string;  // For compatibility with some components
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingCode?: string;  // For compatibility with some components
}

// Shipping option
export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

// Coupon
export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed' | 'freeShipping';
  discount: number;
  minPurchaseAmount?: number;
  expiryDate?: string | Date;
  usageLimit?: number;
  isValid: boolean;
}
