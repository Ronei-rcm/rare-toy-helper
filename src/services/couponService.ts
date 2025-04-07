
import { toast } from "sonner";

export type CouponType = "percentage" | "fixed" | "freeShipping";

export interface Coupon {
  code: string;
  type: CouponType;
  discount: number;
  minPurchaseAmount?: number;
  expiryDate?: Date;
  usageLimit?: number;
  usageCount?: number;
  isValid: boolean;
}

// Mock coupons for demonstration
const mockCoupons: Coupon[] = [
  {
    code: "WELCOME20",
    type: "percentage",
    discount: 20,
    isValid: true
  },
  {
    code: "FREESHIP",
    type: "freeShipping",
    discount: 0,
    minPurchaseAmount: 100,
    isValid: true
  },
  {
    code: "SUMMER10",
    type: "percentage",
    discount: 10,
    expiryDate: new Date(2023, 8, 30), // September 30, 2023
    isValid: false
  },
  {
    code: "FIXED50",
    type: "fixed",
    discount: 50,
    minPurchaseAmount: 200,
    usageLimit: 100,
    usageCount: 45,
    isValid: true
  }
];

// In-memory storage for coupons
let coupons = [...mockCoupons];

export const couponService = {
  // Get all coupons
  getAllCoupons: (): Coupon[] => {
    return coupons;
  },

  // Get valid coupons only
  getValidCoupons: (): Coupon[] => {
    return coupons.filter(coupon => coupon.isValid);
  },

  // Add a new coupon
  addCoupon: (coupon: Omit<Coupon, "isValid">): Coupon => {
    const newCoupon = {
      ...coupon,
      isValid: true,
      usageCount: 0
    };
    
    // Check if coupon code already exists
    if (coupons.some(c => c.code === newCoupon.code)) {
      throw new Error("Coupon code already exists");
    }
    
    coupons.push(newCoupon);
    return newCoupon;
  },

  // Update an existing coupon
  updateCoupon: (code: string, couponData: Partial<Coupon>): Coupon => {
    const index = coupons.findIndex(c => c.code === code);
    
    if (index === -1) {
      throw new Error("Coupon not found");
    }
    
    const updatedCoupon = {
      ...coupons[index],
      ...couponData
    };
    
    coupons[index] = updatedCoupon;
    return updatedCoupon;
  },

  // Delete a coupon
  deleteCoupon: (code: string): boolean => {
    const initialLength = coupons.length;
    coupons = coupons.filter(c => c.code !== code);
    return coupons.length < initialLength;
  },

  // Apply a coupon to a total amount
  applyCoupon: (code: string, amount: number): { 
    success: boolean; 
    message: string; 
    discountedAmount: number;
    discountValue: number;
  } => {
    const coupon = coupons.find(c => c.code === code);
    
    if (!coupon) {
      return {
        success: false,
        message: "Cupom não encontrado",
        discountedAmount: amount,
        discountValue: 0
      };
    }
    
    if (!coupon.isValid) {
      return {
        success: false,
        message: "Este cupom não é válido",
        discountedAmount: amount,
        discountValue: 0
      };
    }
    
    // Check expiry date
    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return {
        success: false,
        message: "Este cupom expirou",
        discountedAmount: amount,
        discountValue: 0
      };
    }
    
    // Check minimum purchase amount
    if (coupon.minPurchaseAmount && amount < coupon.minPurchaseAmount) {
      return {
        success: false,
        message: `Valor mínimo de compra: R$${coupon.minPurchaseAmount.toFixed(2)}`,
        discountedAmount: amount,
        discountValue: 0
      };
    }
    
    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount && coupon.usageCount >= coupon.usageLimit) {
      return {
        success: false,
        message: "Limite de uso deste cupom foi atingido",
        discountedAmount: amount,
        discountValue: 0
      };
    }
    
    // Calculate discount
    let discountValue = 0;
    let discountedAmount = amount;
    
    if (coupon.type === "percentage") {
      discountValue = (amount * coupon.discount) / 100;
      discountedAmount = amount - discountValue;
    } else if (coupon.type === "fixed") {
      discountValue = Math.min(coupon.discount, amount);
      discountedAmount = amount - discountValue;
    } else if (coupon.type === "freeShipping") {
      // This would integrate with shipping calculation
      // For demo purposes just showing a message
      return {
        success: true,
        message: "Frete grátis aplicado!",
        discountedAmount: amount,
        discountValue: 0
      };
    }
    
    // Update usage count
    const couponIndex = coupons.findIndex(c => c.code === code);
    if (couponIndex !== -1) {
      coupons[couponIndex] = {
        ...coupon,
        usageCount: (coupon.usageCount || 0) + 1
      };
    }
    
    return {
      success: true,
      message: `Cupom aplicado: ${coupon.type === "percentage" ? `${coupon.discount}% de desconto` : `R$${discountValue.toFixed(2)} de desconto`}`,
      discountedAmount,
      discountValue
    };
  },

  // Validate a coupon code
  validateCoupon: (code: string, amount: number): boolean => {
    try {
      const result = couponService.applyCoupon(code, amount);
      return result.success;
    } catch (error) {
      console.error("Error validating coupon:", error);
      return false;
    }
  }
};
