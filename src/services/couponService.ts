
export type CouponType = "percentage" | "fixed" | "freeShipping";

export interface Coupon {
  code: string;
  type: CouponType;
  discount: number;
  minPurchaseAmount?: number;
  expiryDate?: Date;
  category?: string;
  usageLimit?: number;
  currentUsage?: number;
  isValid: boolean;
}

// Lista de cupons disponíveis (simulando um banco de dados)
const availableCoupons: Coupon[] = [
  {
    code: "DESCONTO20",
    type: "percentage",
    discount: 20,
    minPurchaseAmount: 100,
    expiryDate: new Date("2025-12-31"),
    usageLimit: 100,
    currentUsage: 0,
    isValid: true
  },
  {
    code: "FRETE",
    type: "freeShipping",
    discount: 0, // O valor do frete será aplicado no checkout
    expiryDate: new Date("2025-12-31"),
    isValid: true
  },
  {
    code: "10REAIS",
    type: "fixed",
    discount: 10,
    minPurchaseAmount: 50,
    expiryDate: new Date("2025-12-31"),
    isValid: true
  }
];

export const couponService = {
  validateCoupon: (code: string, cartTotal: number): Coupon | null => {
    const coupon = availableCoupons.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return null; // Cupom não encontrado
    }
    
    // Verificar se o cupom expirou
    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return { ...coupon, isValid: false };
    }
    
    // Verificar valor mínimo de compra
    if (coupon.minPurchaseAmount && cartTotal < coupon.minPurchaseAmount) {
      return { ...coupon, isValid: false };
    }
    
    // Verificar limite de uso
    if (coupon.usageLimit && coupon.currentUsage && coupon.currentUsage >= coupon.usageLimit) {
      return { ...coupon, isValid: false };
    }
    
    return { ...coupon, isValid: true };
  },
  
  applyCoupon: (coupon: Coupon, cartTotal: number, shippingCost: number): number => {
    if (!coupon.isValid) return 0;
    
    switch (coupon.type) {
      case "percentage":
        return (cartTotal * coupon.discount) / 100;
      case "fixed":
        return coupon.discount;
      case "freeShipping":
        return shippingCost;
      default:
        return 0;
    }
  },
  
  getAllCoupons: (): Coupon[] => {
    return availableCoupons;
  },
  
  getCouponByCode: (code: string): Coupon | undefined => {
    return availableCoupons.find(c => c.code === code.toUpperCase());
  }
};
