
export interface Coupon {
  code: string;
  discount: number; // percentage
  description: string;
  validUntil: Date;
  isValid: boolean;
  minimumPurchase?: number;
  maxDiscount?: number;
  isPercentage: boolean;
}

const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    discount: 10,
    description: "10% off your first purchase",
    validUntil: new Date(2025, 11, 31),
    isValid: true,
    isPercentage: true
  },
  {
    code: "SUMMER25",
    discount: 25,
    description: "25% off summer collection",
    validUntil: new Date(2025, 8, 30),
    isValid: true,
    minimumPurchase: 100,
    maxDiscount: 50,
    isPercentage: true
  }
];

interface AppliedCoupon {
  code: string;
  discount: number;
  isPercentage: boolean;
}

export const couponService = {
  getAllCoupons(): Coupon[] {
    return [...coupons];
  },

  getCouponByCode(code: string): Coupon {
    const coupon = coupons.find(c => c.code === code);
    return coupon || {
      code: "",
      discount: 0,
      description: "",
      validUntil: new Date(),
      isValid: false,
      isPercentage: false
    };
  },

  isValidCoupon(code: string): boolean {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) return false;
    
    const now = new Date();
    return coupon.isValid && coupon.validUntil > now;
  },

  addCoupon(coupon: Omit<Coupon, "isValid">): void {
    coupons.push({
      ...coupon,
      isValid: true
    });
  },

  updateCoupon(coupon: Coupon): void {
    const index = coupons.findIndex(c => c.code === coupon.code);
    if (index >= 0) {
      coupons[index] = coupon;
    }
  },

  deleteCoupon(code: string): void {
    const index = coupons.findIndex(c => c.code === code);
    if (index >= 0) {
      coupons.splice(index, 1);
    }
  },

  // Adding the missing methods referenced in the CartSectionWithService component
  applyCoupon(code: string, subtotal: number): AppliedCoupon | null {
    const coupon = this.getCouponByCode(code);
    
    if (!this.isValidCoupon(code)) {
      return null;
    }

    if (coupon.minimumPurchase && subtotal < coupon.minimumPurchase) {
      return null;
    }

    let discount = coupon.isPercentage ? (subtotal * coupon.discount / 100) : coupon.discount;
    
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }

    return {
      code: coupon.code,
      discount,
      isPercentage: coupon.isPercentage
    };
  }
};
