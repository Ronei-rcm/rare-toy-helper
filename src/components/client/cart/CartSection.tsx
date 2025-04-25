
import React from 'react';
import { Card } from "../../../components/ui/card";
import { ShoppingCart } from "lucide-react";
import EmptyCart from "./EmptyCart";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import { CartItem } from "../../../types/client";

interface CartSectionProps {
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const CartSection = ({ 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity, 
  onCheckout 
}: CartSectionProps) => {
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.price || item.preco || 0;
    const quantity = item.quantity || item.quantidade || 0;
    return total + (price * quantity);
  }, 0);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <ShoppingCart className="w-6 h-6" />
            <h2>Meu Carrinho</h2>
          </div>
          
          <div className="divide-y">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          
          <CartSummary 
            subtotal={cartTotal}
            onCheckout={onCheckout}
          />
        </div>
      </Card>
    </div>
  );
};

export default CartSection;
