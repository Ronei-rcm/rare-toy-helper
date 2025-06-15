
import React, { useState } from 'react';
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ShoppingCart, ArrowLeft, Save, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import EmptyCart from "./EmptyCart";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import RecommendedProducts from "./RecommendedProducts";
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
  const [isSaving, setIsSaving] = useState(false);

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.price || item.preco || 0;
    const quantity = item.quantity || item.quantidade || 0;
    return total + (price * quantity);
  }, 0);

  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || item.quantidade || 0), 0);

  const handleSaveCart = async () => {
    setIsSaving(true);
    // Simular salvamento do carrinho
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Carrinho salvo com sucesso!");
  };

  const handleShareCart = () => {
    // Simular compartilhamento do carrinho
    if (navigator.share) {
      navigator.share({
        title: 'Meu Carrinho MUHL Store',
        text: `Confira os ${itemCount} itens no meu carrinho!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link do carrinho copiado!");
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header do carrinho */}
      <motion.div 
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meu Carrinho</h1>
            <p className="text-gray-600">
              {itemCount} {itemCount === 1 ? 'item' : 'itens'} • Total: R$ {cartTotal.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveCart}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Salvando...' : 'Salvar Carrinho'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleShareCart}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Lista de itens do carrinho */}
          <Card className="shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xl font-semibold text-primary mb-6">
                <ShoppingCart className="w-6 h-6" />
                <h2>Itens do Carrinho</h2>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                  {itemCount}
                </span>
              </div>
              
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CartItemCard
                      item={item}
                      onRemove={onRemoveItem}
                      onUpdateQuantity={onUpdateQuantity}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Produtos recomendados */}
          <RecommendedProducts />
        </div>
        
        {/* Resumo lateral */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary 
              subtotal={cartTotal}
              onCheckout={onCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
