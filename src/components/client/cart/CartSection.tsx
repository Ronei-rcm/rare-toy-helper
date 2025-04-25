
import React from 'react';
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import EmptyCart from "./EmptyCart";
import { CartItem } from "../../../types/client";
import { toast } from "sonner";

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

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("A quantidade não pode ser menor que 1");
      return;
    }
    onUpdateQuantity(productId, newQuantity);
  };

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
              <div key={item.id} className="py-4 flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
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
                  <h3 className="font-medium text-lg">{item.name || item.nome}</h3>
                  <p className="text-primary font-bold text-lg">
                    R$ {(item.price || item.preco || 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border rounded-lg p-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.productId, (item.quantity || item.quantidade || 0) - 1)}
                      disabled={(item.quantity || item.quantidade || 0) <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity || item.quantidade}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.productId, (item.quantity || item.quantidade || 0) + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span className="font-bold">R$ {cartTotal.toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full text-lg h-12"
              onClick={onCheckout}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartSection;
