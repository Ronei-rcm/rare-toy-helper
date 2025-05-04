
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onCheckoutComplete: () => void;
}

export default function CheckoutDialog({
  isOpen,
  onOpenChange,
  total,
  onCheckoutComplete,
}: CheckoutDialogProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast.success("Pedido realizado com sucesso!");
      onCheckoutComplete();
      setStep(1); // Reset for next time
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalização de Compra</DialogTitle>
          <DialogDescription>
            {step === 1 && "Informe seu endereço de entrega"}
            {step === 2 && "Escolha a forma de pagamento"}
            {step === 3 && "Confirmação do pedido"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === 1 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" placeholder="Rua Exemplo" />
                </div>
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" placeholder="123" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="complement">Complemento (opcional)</Label>
                <Input id="complement" placeholder="Apto 101" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" placeholder="Centro" />
                </div>
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="São Paulo" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" placeholder="SP" />
                </div>
                <div>
                  <Label htmlFor="zipcode">CEP</Label>
                  <Input id="zipcode" placeholder="00000-000" />
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-3">
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 border p-3 rounded">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Cartão de Crédito</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">PIX</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label htmlFor="boleto">Boleto Bancário</Label>
                </div>
              </RadioGroup>
              
              {paymentMethod === "credit_card" && (
                <div className="space-y-3 mt-4">
                  <div>
                    <Label htmlFor="card_number">Número do Cartão</Label>
                    <Input id="card_number" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card_name">Nome no Cartão</Label>
                    <Input id="card_name" placeholder="Nome completo" />
                  </div>
                </div>
              )}
              
              {paymentMethod === "pix" && (
                <div className="border p-4 rounded mt-4">
                  <div className="text-center mb-3">
                    <p className="text-sm text-gray-500">
                      Após confirmar seu pedido, você receberá um QR Code PIX para pagamento
                    </p>
                  </div>
                </div>
              )}
              
              {paymentMethod === "boleto" && (
                <div className="border p-4 rounded mt-4">
                  <div className="text-center mb-3">
                    <p className="text-sm text-gray-500">
                      Após confirmar seu pedido, você poderá imprimir o boleto ou copiar o código de barras
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">Resumo do Pedido</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {(total - 15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span>R$ 15.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">Pagamento</h3>
                <p className="text-sm">
                  {paymentMethod === "credit_card" && "Cartão de Crédito"}
                  {paymentMethod === "pix" && "PIX"}
                  {paymentMethod === "boleto" && "Boleto Bancário"}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
          </div>
          <Button onClick={handleNext}>
            {step < 3 ? "Continuar" : "Finalizar Compra"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
