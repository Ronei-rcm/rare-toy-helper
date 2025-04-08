
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

// Mock data
const mockCoupons: Coupon[] = [
  { 
    code: 'WELCOME10', 
    type: 'percentage', 
    discount: 10, 
    expiryDate: new Date(2023, 11, 31), 
    isValid: true 
  },
  { 
    code: 'FREESHIPPING', 
    type: 'freeShipping', 
    discount: 0, 
    minPurchaseAmount: 100, 
    isValid: true 
  },
  { 
    code: 'FIXED20', 
    type: 'fixed', 
    discount: 20, 
    isValid: true 
  },
];

let coupons = [...mockCoupons];

export const couponService = {
  getAllCoupons(): Coupon[] {
    return [...coupons];
  },

  getCouponByCode(code: string): Coupon {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) {
      throw new Error(`Coupon with code ${code} not found`);
    }
    return { ...coupon };
  },

  isValidCoupon(code: string): boolean {
    try {
      const coupon = this.getCouponByCode(code);
      
      // Check if coupon is marked as valid
      if (!coupon.isValid) return false;
      
      // Check expiration date
      if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  },

  addCoupon(coupon: Omit<Coupon, "isValid">): void {
    const newCoupon = { 
      ...coupon, 
      isValid: true,
    };
    coupons.push(newCoupon as Coupon);
  },

  updateCoupon(coupon: Coupon): void {
    const index = coupons.findIndex(c => c.code === coupon.code);
    if (index !== -1) {
      coupons[index] = { ...coupon };
    }
  },

  deleteCoupon(code: string): void {
    coupons = coupons.filter(c => c.code !== code);
  },

  applyCoupon(code: string, amount: number): number {
    if (!this.isValidCoupon(code)) {
      throw new Error("Invalid or expired coupon");
    }

    const coupon = this.getCouponByCode(code);
    
    // Check minimum purchase requirement
    if (coupon.minPurchaseAmount && amount < coupon.minPurchaseAmount) {
      throw new Error(`Minimum purchase amount of R$${coupon.minPurchaseAmount} not met`);
    }
    
    // Calculate discount based on type
    switch (coupon.type) {
      case 'percentage':
        return amount * (1 - coupon.discount / 100);
      case 'fixed':
        return Math.max(0, amount - coupon.discount);
      case 'freeShipping':
        // This would be handled elsewhere, return original amount
        return amount;
      default:
        return amount;
    }
  }
};
