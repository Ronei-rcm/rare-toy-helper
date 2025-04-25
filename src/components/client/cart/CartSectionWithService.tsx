
import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { ShoppingCart, Trash2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import EmptyCart from './EmptyCart';
import { couponService } from '../../../services/couponService';
import WhatsAppButton from '../../../components/WhatsAppButton';
import { CartItem, ShippingOption, Coupon } from '../../../types/client';

interface CartSectionWithServiceProps {
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const CartSectionWithService = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}: CartSectionWithServiceProps) => {
  const [subtotal, setSubtotal] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

  // Shipping options
  const shippingOptions: ShippingOption[] = [
    { id: 'standard', name: 'Entrega Padrão', price: 15.90, estimatedDays: '5-7 dias úteis' },
    { id: 'express', name: 'Entrega Expressa', price: 29.90, estimatedDays: '2-3 dias úteis' },
    { id: 'pickup', name: 'Retirada na Loja', price: 0, estimatedDays: 'Disponível em 24h' }
  ];

  // Calculate subtotal
  useEffect(() => {
    const newSubtotal = cartItems.reduce((total, item) => {
      const price = item.price || item.preco || 0;
      const quantity = item.quantity || item.quantidade || 0;
      return total + (price * quantity);
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  // Calculate total when subtotal, discount or shipping changes
  useEffect(() => {
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Por favor, digite um código de cupom.");
      return;
    }

    const result = couponService.applyCoupon(couponCode, subtotal);

    if (result.success) {
      setDiscount(result.discount);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleShippingChange = (option: ShippingOption) => {
    setShippingOption(option);
    setShippingCost(option.price);
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Meu Carrinho</h2>
      </div>
      
      {/* Cart items */}
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
                <Trash2 className="h-4 w-4 mr-1" /> Remover
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-gray-50">
        {/* Coupon code */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Cupom de desconto</h3>
          <div className="flex space-x-2">
            <input 
              type="text" 
              className="flex-grow border rounded px-3 py-2"
              placeholder="Digite seu cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button 
              variant="outline"
              onClick={handleApplyCoupon}
            >
              Aplicar
            </Button>
          </div>
        </div>
        
        {/* Shipping options */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Opções de entrega</h3>
          <div className="space-y-2">
            {shippingOptions.map((option) => (
              <div 
                key={option.id}
                className={`border rounded p-3 cursor-pointer ${shippingOption?.id === option.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleShippingChange(option)}
              >
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">{option.name}</span>
                    <p className="text-sm text-gray-500">{option.estimatedDays}</p>
                  </div>
                  <span className="font-semibold">
                    {option.price === 0 ? "Grátis" : `R$ ${option.price.toFixed(2)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto:</span>
              <span>- R$ {discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Frete:</span>
            <span>{shippingOption ? (shippingOption.price === 0 ? "Grátis" : `R$ ${shippingOption.price.toFixed(2)}`) : "Calculado no checkout"}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">R$ {total.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-6 space-y-3">
          <Button 
            className="w-full"
            onClick={onCheckout}
            disabled={cartItems.length === 0 || !shippingOption}
          >
            Finalizar Compra
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = '/collection'}
          >
            Continuar Comprando
          </Button>
          
          <div className="mt-4 flex justify-center">
            <WhatsAppButton 
              customMessage="Olá! Gostaria de tirar uma dúvida sobre meu pedido." 
              variant="ghost"
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSectionWithService;
