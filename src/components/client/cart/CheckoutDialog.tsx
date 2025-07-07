
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
import { toast } from "sonner";
import PixPayment from "./PixPayment";
import AddressForm from "./checkout/AddressForm";
import PaymentMethodSelection from "./checkout/PaymentMethodSelection";
import OrderConfirmation from "./checkout/OrderConfirmation";

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
  const [showPixPayment, setShowPixPayment] = useState(false);
  const [orderId] = useState(`MUHL${Date.now()}`);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (paymentMethod === "pix") {
        setShowPixPayment(true);
      } else {
        toast.success("Pedido realizado com sucesso!");
        onCheckoutComplete();
        setStep(1);
        onOpenChange(false);
      }
    }
  };

  const handlePixPaymentComplete = () => {
    onCheckoutComplete();
    setStep(1);
    onOpenChange(false);
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
          {step === 1 && <AddressForm />}
          {step === 2 && (
            <PaymentMethodSelection 
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          )}
          {step === 3 && (
            <OrderConfirmation 
              total={total}
              paymentMethod={paymentMethod}
            />
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
            {step < 3 ? "Continuar" : (paymentMethod === "pix" ? "Pagar com PIX" : "Finalizar Compra")}
          </Button>
        </DialogFooter>
      </DialogContent>
      
      <PixPayment
        isOpen={showPixPayment}
        onOpenChange={setShowPixPayment}
        amount={total}
        orderId={orderId}
        onPaymentComplete={handlePixPaymentComplete}
      />
    </Dialog>
  );
}
