
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { ShoppingBag, CreditCard } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary = ({ subtotal, onCheckout }: CartSummaryProps) => {
  // Fixed shipping cost for now - could be dynamic in the future
  const shippingCost = subtotal > 0 ? 15 : 0;
  const total = subtotal + shippingCost;
  
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <ShoppingBag className="w-5 h-5" />
        <h3>Resumo do pedido</h3>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Frete:</span>
          <span>R$ {shippingCost.toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full text-lg h-12 gap-2"
        onClick={onCheckout}
        disabled={subtotal === 0}
      >
        <CreditCard className="w-5 h-5" />
        Finalizar Compra
      </Button>
      
      <div className="text-xs text-center text-gray-500">
        Pagamentos seguros processados com criptografia
      </div>
    </div>
  );
};

export default CartSummary;
