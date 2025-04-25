
import React from 'react';
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary = ({ subtotal, onCheckout }: CartSummaryProps) => {
  return (
    <div className="space-y-4">
      <Separator />
      <div className="space-y-4">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span className="font-bold">R$ {subtotal.toFixed(2)}</span>
        </div>
        
        <Button 
          className="w-full text-lg h-12"
          onClick={onCheckout}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
