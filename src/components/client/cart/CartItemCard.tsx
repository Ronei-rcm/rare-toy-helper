
import React from 'react';
import { Button } from "../../../components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "../../../types/client";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const CartItemCard = ({ item, onRemove, onUpdateQuantity }: CartItemCardProps) => {
  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("A quantidade não pode ser menor que 1");
      return;
    }
    onUpdateQuantity(item.productId, newQuantity);
  };

  return (
    <div className="py-4 flex items-center gap-4">
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
            onClick={() => handleUpdateQuantity((item.quantity || item.quantidade || 0) - 1)}
            disabled={(item.quantity || item.quantidade || 0) <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity || item.quantidade}</span>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => handleUpdateQuantity((item.quantity || item.quantidade || 0) + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          size="icon"
          onClick={() => onRemove(item.productId)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
