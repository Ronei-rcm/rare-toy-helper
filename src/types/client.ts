
// Client Types

// Cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  maxQuantity?: number;
}

// Order status
export type OrderStatus = 
  | "pending"     // Order created but not paid
  | "processing"  // Order paid and being processed
  | "shipped"     // Order has been shipped
  | "delivered"   // Order has been delivered
  | "completed"   // Order complete (after any return period)
  | "cancelled"   // Order cancelled
  | "refunded";   // Order refunded

// Payment method
export type PaymentMethod = 
  | "credit_card"
  | "debit_card"
  | "pix"
  | "boleto"
  | "paypal";

// Address
export interface Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  isDefault?: boolean;
}

// Order
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  shippingCost: number;
  discount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// User profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

// Wishlist item
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  addedAt: string;
  isInStock: boolean;
}

// Complete client state
export interface ClientState {
  cart: {
    items: CartItem[];
    total: number;
    shippingCost: number;
    discount: number;
    couponCode?: string;
  };
  orders: Order[];
  selectedOrder?: Order;
  wishlist: WishlistItem[];
  profile: UserProfile | null;
  ui: {
    showOrderDetails: boolean;
    showCheckout: boolean;
    checkoutStep: number;
    activeSection: string;
  };
}
