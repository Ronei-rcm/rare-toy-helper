
// Client Types

// Cart item type
export interface CartItem {
  id: string;
  productId: string;  // Added productId for compatibility
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
  // Brazilian Portuguese fields for compatibility
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  pais?: string;
}

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

// User profile
export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  addresses?: Address[];
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

// Wishlist item
export interface WishlistItem {
  id: string;
  productId: string;  // Added productId for compatibility
  name: string;
  price: number;
  image?: string;
  addedAt?: string;
  isInStock?: boolean;
  nome?: string;   // Added for backward compatibility
  preco?: number;  // Added for backward compatibility
  imagem?: string; // Added for backward compatibility
}

// User data
export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'client';
  ativo: boolean;
  endereco?: Address;
  telefone?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  newsletter?: boolean;
  notifications?: boolean;
  darkMode?: boolean;
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

// ClientContext type
export interface ClientContextType {
  user: User | null;
  orders: Order[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  checkout: boolean;
  setCheckout: (value: boolean) => void;
  
  // Additional properties that might be used in components
  cartItems?: CartItem[];
  profile?: UserProfile | null;
  handleRemoveFromWishlist?: (productId: string) => void;
  handleAddToCart?: (product: CartItem) => void;
  handleRemoveFromCart?: (productId: string) => void;
  handleUpdateCartItemQuantity?: (productId: string, quantity: number) => void;
  handleOrderDetails?: (order: Order) => void;
  handleCheckout?: () => void;
  cartTotal?: number;
  isOrderDetailsOpen?: boolean;
  setIsOrderDetailsOpen?: (open: boolean) => void;
  isCheckoutOpen?: boolean;
  setIsCheckoutOpen?: (open: boolean) => void;
  handleCheckoutComplete?: () => void;
}
