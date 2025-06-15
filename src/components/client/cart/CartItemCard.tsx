
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, Heart, Eye, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CartItem } from "../../../types/client";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const CartItemCard = ({ item, onRemove, onUpdateQuantity }: CartItemCardProps) => {
  const [quantity, setQuantity] = useState(item.quantity || item.quantidade || 1);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("A quantidade não pode ser menor que 1");
      return;
    }
    if (newQuantity > 10) {
      toast.error("Quantidade máxima: 10 unidades");
      return;
    }
    
    setQuantity(newQuantity);
    onUpdateQuantity(item.productId, newQuantity);
    toast.success("Quantidade atualizada!");
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Animação de remoção
    onRemove(item.productId);
    toast.success("Produto removido do carrinho");
  };

  const handleSaveForLater = () => {
    // Implementar funcionalidade de salvar para depois
    toast.success("Produto salvo para mais tarde!");
  };

  const itemTotal = (item.price || item.preco || 0) * quantity;

  return (
    <AnimatePresence>
      <motion.div
        className={`py-6 border-b last:border-b-0 ${isRemoving ? 'opacity-50' : ''}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, height: 0, padding: 0, margin: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start gap-4">
          {/* Imagem do produto */}
          <motion.div 
            className="relative w-32 h-32 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {item.image || item.imagem ? (
              <img 
                src={item.image || item.imagem} 
                alt={item.name || item.nome || ''} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <ShoppingCart className="text-gray-400 h-12 w-12" />
              </div>
            )}
            
            {/* Overlay com ações rápidas */}
            <AnimatePresence>
              {showActions && (
                <motion.div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90">
                    <Heart className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Informações do produto */}
          <div className="flex-grow space-y-2">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                {item.name || item.nome}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-2xl font-bold text-primary">
                  R$ {(item.price || item.preco || 0).toFixed(2)}
                </p>
                <span className="text-sm text-gray-500">por unidade</span>
              </div>
            </div>
            
            {/* Controles de quantidade */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border rounded-lg p-1 bg-gray-50">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <motion.span 
                  className="w-12 text-center font-medium"
                  key={quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {quantity}
                </motion.span>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <motion.div 
                className="text-lg font-semibold text-gray-700"
                key={itemTotal}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                Total: R$ {itemTotal.toFixed(2)}
              </motion.div>
            </div>
            
            {/* Ações do item */}
            <AnimatePresence>
              {showActions && (
                <motion.div 
                  className="flex items-center gap-2 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSaveForLater}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Salvar para depois
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    onClick={handleRemove}
                    disabled={isRemoving}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {isRemoving ? 'Removendo...' : 'Remover'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItemCard;
