
import { User } from './user';
import { CartItem } from './cart';
import { WishlistItem } from './wishlist';
import { Order } from './cart';
import { UserProfile } from './user';

// Client state
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
