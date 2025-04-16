
// Type declarations for services and custom components

declare module '@/services/whatsappService' {
  export interface WhatsAppConfig {
    enabled: boolean;
    phoneNumber: string;
    defaultMessage: string;
    welcomeMessage: string;
    notificationsEnabled: boolean;
    autoReplyEnabled: boolean;
    autoReplyMessage: string;
  }
  
  export const whatsappService: {
    getConfig(): WhatsAppConfig;
    generateWhatsAppLink(customMessage?: string): string;
    updateConfig(config: Partial<WhatsAppConfig>): WhatsAppConfig;
    sendMessage(phoneNumber: string, message: string): Promise<boolean>;
  };
}

declare module '@/services/couponService' {
  export type CouponType = 'percentage' | 'fixed' | 'freeShipping';
  
  export interface Coupon {
    code: string;
    type: CouponType;
    discount: number;
    minPurchaseAmount?: number;
    expiryDate?: Date;
    usageLimit?: number;
    isValid: boolean;
  }
  
  export const couponService: {
    getAllCoupons(): Coupon[];
    getCouponByCode(code: string): Coupon | undefined;
    isValidCoupon(code: string): boolean;
    addCoupon(coupon: Omit<Coupon, 'isValid'>): void;
    updateCoupon(coupon: Coupon): void;
    deleteCoupon(code: string): void;
    applyCoupon(coupon: Coupon, subtotal: number, shippingCost: number): number;
    validateCoupon(code: string, subtotal: number): Coupon | null;
  };
}

declare module '@/services/userService' {
  export interface User {
    id: string;
    nome: string;
    email: string;
    tipo: string;
    ativo: boolean;
    createdAt: string;
  }
  
  export const userService: {
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | undefined>;
    createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
  };
}

declare module '@/components/ToyCard' {
  export interface ToyItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    condition: 'mint' | 'excellent' | 'good' | 'fair';
    year?: string;
    isRare?: boolean;
    description?: string;
    stock?: number;
  }
  
  export interface ToyCardProps {
    toy: ToyItem;
    priority?: boolean;
  }
  
  const ToyCard: React.FC<ToyCardProps>;
  export default ToyCard;
}
