
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash, Plus, Minus, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CartItem, Coupon, ShippingOption } from "@/types/client";
import EmptyCart from "./EmptyCart";

interface CartSectionProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function CartSection({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}: CartSectionProps) {
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);

  const shippingOptions: ShippingOption[] = [
    { id: "standard", name: "Entrega Padrão", price: 15.90, estimatedDays: "5-7 dias úteis" },
    { id: "express", name: "Entrega Expressa", price: 25.90, estimatedDays: "2-3 dias úteis" },
    { id: "pickup", name: "Retirada na Loja", price: 0, estimatedDays: "1 dia útil" },
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const shippingCost = selectedShipping 
    ? shippingOptions.find(option => option.id === selectedShipping)?.price || 0 
    : 0;
  
  const discountAmount = coupon 
    ? coupon.type === "percentage" 
      ? (subtotal * coupon.discount / 100) 
      : coupon.discount 
    : 0;
  
  const total = subtotal + shippingCost - discountAmount;

  const handleApplyCoupon = () => {
    // Simulação de validação de cupom
    if (couponCode.toUpperCase() === "DESCONTO20") {
      setCoupon({
        code: "DESCONTO20",
        discount: 20,
        type: "percentage",
        isValid: true
      });
    } else if (couponCode.toUpperCase() === "FRETE") {
      setCoupon({
        code: "FRETE",
        discount: 15.90,
        type: "fixed",
        isValid: true
      });
    } else {
      setCoupon(null);
      alert("Cupom inválido");
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Meu Carrinho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-3 border-b">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Opções de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedShipping || ""} onValueChange={setSelectedShipping}>
              {shippingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex flex-1 justify-between">
                    <div>
                      <span className="font-medium">{option.name}</span>
                      <p className="text-sm text-gray-500">{option.estimatedDays}</p>
                    </div>
                    <span>
                      {option.price === 0 
                        ? "Grátis" 
                        : `R$ ${option.price.toFixed(2)}`}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            
            {selectedShipping && (
              <div className="flex justify-between">
                <span>Frete</span>
                <span>
                  {shippingCost === 0 
                    ? "Grátis" 
                    : `R$ ${shippingCost.toFixed(2)}`}
                </span>
              </div>
            )}
            
            {coupon && (
              <div className="flex justify-between text-green-600">
                <span>Desconto ({coupon.code})</span>
                <span>- R$ {discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Input
                placeholder="Código do cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleApplyCoupon}
                variant="outline"
              >
                Aplicar
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              size="lg"
              onClick={onCheckout}
              disabled={!selectedShipping}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Finalizar Compra
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}
