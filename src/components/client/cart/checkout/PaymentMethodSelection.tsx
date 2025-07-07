import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PaymentMethodSelectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export default function PaymentMethodSelection({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodSelectionProps) {
  return (
    <div className="space-y-3">
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={onPaymentMethodChange}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2 border p-3 rounded">
          <RadioGroupItem value="credit_card" id="credit_card" />
          <Label htmlFor="credit_card">Cartão de Crédito</Label>
        </div>
        <div className="flex items-center space-x-2 border p-3 rounded hover:border-primary transition-colors">
          <RadioGroupItem value="pix" id="pix" />
          <Label htmlFor="pix" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">
              PIX
            </div>
            PIX - Pagamento instantâneo
          </Label>
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
        <div className="border border-primary/20 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg mt-4">
          <div className="text-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
              PIX
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Pagamento PIX</h3>
            <p className="text-sm text-gray-600 mb-2">
              Após confirmar seu pedido, você receberá:
            </p>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>✓ QR Code para pagamento</li>
              <li>✓ Chave PIX para cópia</li>
              <li>✓ Confirmação instantânea</li>
            </ul>
            <div className="bg-white/70 p-2 rounded mt-3">
              <p className="text-xs text-gray-500">
                💰 Sem taxas adicionais • ⚡ Aprovação imediata
              </p>
            </div>
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
  );
}