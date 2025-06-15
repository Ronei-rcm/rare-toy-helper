
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { ShoppingBag, CreditCard, Tag, Truck, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary = ({ subtotal, onCheckout }: CartSummaryProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number, type: 'percentage' | 'fixed'} | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<'standard' | 'express' | 'overnight'>('standard');
  
  // Opções de frete dinâmicas
  const shippingOptions = {
    standard: { name: 'Padrão (5-7 dias)', price: subtotal > 200 ? 0 : 15 },
    express: { name: 'Expresso (2-3 dias)', price: 25 },
    overnight: { name: 'Entrega Rápida (1 dia)', price: 45 }
  };
  
  const shippingCost = subtotal > 0 ? shippingOptions[selectedShipping].price : 0;
  
  // Calcular desconto
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }
  
  const total = Math.max(0, subtotal + shippingCost - discount);
  
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    
    // Simular validação de cupom
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Cupons de exemplo
    const validCoupons = {
      'BEMVINDO10': { discount: 10, type: 'percentage' as const },
      'FRETE15': { discount: 15, type: 'fixed' as const },
      'NATAL20': { discount: 20, type: 'percentage' as const }
    };
    
    const coupon = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
    
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      toast.success(`Cupom ${couponCode.toUpperCase()} aplicado com sucesso!`);
      setCouponCode('');
    } else {
      toast.error('Cupom inválido ou expirado');
    }
    
    setIsApplyingCoupon(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Cupom removido');
  };

  return (
    <motion.div 
      className="space-y-6 bg-white p-6 rounded-xl border shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <ShoppingBag className="w-5 h-5" />
        <h3>Resumo do pedido</h3>
      </div>
      
      <Separator />
      
      {/* Cupom de desconto */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Tag className="w-4 h-4" />
          <span>Cupom de desconto</span>
        </div>
        
        <AnimatePresence>
          {!appliedCoupon ? (
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Input
                placeholder="Digite seu cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
              />
              <Button 
                variant="outline" 
                onClick={handleApplyCoupon}
                disabled={isApplyingCoupon || !couponCode.trim()}
                className="whitespace-nowrap"
              >
                {isApplyingCoupon ? 'Aplicando...' : 'Aplicar'}
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">{appliedCoupon.code}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={removeCoupon}
                className="text-green-600 hover:text-green-800"
              >
                Remover
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Separator />
      
      {/* Opções de frete */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Truck className="w-4 h-4" />
          <span>Opções de entrega</span>
        </div>
        
        <div className="space-y-2">
          {Object.entries(shippingOptions).map(([key, option]) => (
            <motion.label 
              key={key}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedShipping === key ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  value={key}
                  checked={selectedShipping === key}
                  onChange={(e) => setSelectedShipping(e.target.value as any)}
                  className="text-primary"
                />
                <span className="text-sm">{option.name}</span>
              </div>
              <span className="text-sm font-medium">
                {option.price === 0 ? 'Grátis' : `R$ ${option.price.toFixed(2)}`}
              </span>
            </motion.label>
          ))}
        </div>
        
        {subtotal > 200 && selectedShipping === 'standard' && (
          <motion.p 
            className="text-xs text-green-600 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Gift className="w-3 h-3" />
            Frete grátis em compras acima de R$ 200!
          </motion.p>
        )}
      </div>
      
      <Separator />
      
      {/* Resumo de valores */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <motion.div 
            className="flex justify-between text-sm text-green-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>Desconto ({appliedCoupon.code}):</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </motion.div>
        )}
        
        <div className="flex justify-between text-sm">
          <span>Frete:</span>
          <span>{shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`}</span>
        </div>
        
        <Separator />
        
        <motion.div 
          className="flex justify-between text-lg font-bold"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span>Total:</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </motion.div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className="w-full text-lg h-12 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={onCheckout}
          disabled={subtotal === 0}
        >
          <CreditCard className="w-5 h-5" />
          Finalizar Compra
        </Button>
      </motion.div>
      
      <div className="text-xs text-center text-gray-500 space-y-1">
        <p>🔒 Pagamentos seguros processados com criptografia</p>
        <p>📦 Entrega garantida ou seu dinheiro de volta</p>
      </div>
    </motion.div>
  );
};

export default CartSummary;
