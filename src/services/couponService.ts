
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

// Dummy data to simulate a database
const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percentage",
    discount: 10,
    isValid: true
  },
  {
    code: "FIXED20",
    type: "fixed",
    discount: 20,
    minPurchaseAmount: 100,
    isValid: true
  },
  {
    code: "FREESHIP",
    type: "freeShipping",
    discount: 0,
    isValid: true
  },
  {
    code: "SUMMER30",
    type: "percentage",
    discount: 30,
    expiryDate: new Date("2023-09-30"),
    isValid: false
  }
];

export const couponService = {
  getAllCoupons(): Coupon[] {
    return [...coupons];
  },
  
  getCouponByCode(code: string): Coupon | undefined {
    return coupons.find(coupon => coupon.code === code);
  },
  
  isValidCoupon(code: string): boolean {
    const coupon = this.getCouponByCode(code);
    if (!coupon) return false;
    
    if (!coupon.isValid) return false;
    
    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return false;
    }
    
    return true;
  },
  
  addCoupon(coupon: Omit<Coupon, 'isValid'>): void {
    coupons.push({ ...coupon, isValid: true });
  },
  
  updateCoupon(coupon: Coupon): void {
    const index = coupons.findIndex(c => c.code === coupon.code);
    if (index !== -1) {
      coupons[index] = coupon;
    }
  },
  
  deleteCoupon(code: string): void {
    const index = coupons.findIndex(c => c.code === code);
    if (index !== -1) {
      coupons.splice(index, 1);
    }
  },

  // Add these new methods to satisfy the component requirements
  applyCoupon(code: string, cartTotal: number): { success: boolean; discount: number; message: string } {
    const coupon = this.getCouponByCode(code);
    
    if (!coupon) {
      return { success: false, discount: 0, message: "Cupom não encontrado." };
    }
    
    if (!this.isValidCoupon(code)) {
      return { success: false, discount: 0, message: "Cupom inválido ou expirado." };
    }
    
    if (coupon.minPurchaseAmount && cartTotal < coupon.minPurchaseAmount) {
      return { 
        success: false, 
        discount: 0, 
        message: `Valor mínimo de compra é R$ ${coupon.minPurchaseAmount.toFixed(2)}`
      };
    }
    
    let discountValue = 0;
    
    if (coupon.type === "percentage") {
      discountValue = (cartTotal * coupon.discount) / 100;
    } else if (coupon.type === "fixed") {
      discountValue = coupon.discount;
    }
    
    return { 
      success: true, 
      discount: discountValue, 
      message: `Cupom aplicado! Desconto de R$ ${discountValue.toFixed(2)}`
    };
  }
};
