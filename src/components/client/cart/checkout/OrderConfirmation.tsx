import React from 'react';

interface OrderConfirmationProps {
  total: number;
  paymentMethod: string;
}

export default function OrderConfirmation({
  total,
  paymentMethod,
}: OrderConfirmationProps) {
  return (
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
  );
}