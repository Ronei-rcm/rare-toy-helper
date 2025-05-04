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

export interface Address {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  pais: string;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
  darkMode: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  total: number;
  shippingInfo?: ShippingInfo;
  paymentInfo?: PaymentInfo;
}

export interface ShippingInfo {
  method: string;
  cost: number;
  address: Address;
  trackingNumber?: string;
}

export interface PaymentInfo {
  method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  nome: string;
  preco: number;
  imagem: string;
  addedAt: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed' | 'freeShipping';
  discount: number;
  minPurchaseAmount?: number;
  expiryDate?: string;
  isValid: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

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
}
