
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import EmptyCart from "@/components/client/cart/EmptyCart";
import { CartItem } from "@/types/client";

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
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Meu Carrinho</h2>
      </div>
      
      <div className="divide-y">
        {cartItems.map((item) => (
          <div key={item.id} className="p-6 flex items-center">
            <div className="w-20 h-20 rounded bg-gray-100 flex-shrink-0 mr-4 overflow-hidden">
              {item.image || item.imagem ? (
                <img 
                  src={item.image || item.imagem} 
                  alt={item.name || item.nome || ''} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <ShoppingCart className="text-gray-400 h-8 w-8" />
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <h3 className="font-medium">{item.name || item.nome}</h3>
              <p className="text-primary font-bold">
                R$ {(item.price || item.preco || 0).toFixed(2)}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center border rounded">
                <button 
                  className="px-3 py-1 border-r" 
                  onClick={() => onUpdateQuantity(item.productId, (item.quantity || item.quantidade || 0) - 1)}
                  disabled={(item.quantity || item.quantidade || 0) <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1">{item.quantity || item.quantidade}</span>
                <button 
                  className="px-3 py-1 border-l"
                  onClick={() => onUpdateQuantity(item.productId, (item.quantity || item.quantidade || 0) + 1)}
                >
                  +
                </button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onRemoveItem(item.productId)}
              >
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>R$ {cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Frete:</span>
          <span>Calculado no checkout</span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between mb-6">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-lg">R$ {cartTotal.toFixed(2)}</span>
        </div>
        <Button 
          className="w-full" 
          onClick={onCheckout}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default CartSection;
