
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Calendar, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      onCheckoutComplete();
      toast.success("Pagamento realizado com sucesso! Seu pedido foi confirmado.");
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
          <DialogDescription>
            Escolha seu método de pagamento preferido
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credit">Cartão</TabsTrigger>
            <TabsTrigger value="pix">PIX</TabsTrigger>
            <TabsTrigger value="boleto">Boleto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credit">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Nome no Cartão</Label>
                <Input id="cardName" placeholder="Nome completo como no cartão" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <div className="relative">
                  <Input 
                    id="cardNumber" 
                    placeholder="0000 0000 0000 0000" 
                    required 
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Validade</Label>
                  <div className="relative">
                    <Input 
                      id="expiry" 
                      placeholder="MM/AA" 
                      required 
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <div className="relative">
                    <Input 
                      id="cvc" 
                      placeholder="123" 
                      required 
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total a pagar:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              
              <DialogFooter className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processando..." : "Confirmar Pagamento"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="pix">
            <div className="py-6 space-y-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500 mb-2">Escaneie o QR Code para pagar</p>
                <div className="w-48 h-48 mx-auto bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">QR Code PIX</span>
                </div>
                <p className="mt-4 text-sm font-medium">Valor: R$ {total.toFixed(2)}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pixCode">Ou copie o código PIX</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="pixCode" 
                    value="00020126580014br.gov.bcb.pix0136example.com/pix/randomcode5204000053039865802BR5913MUHLSTORE6008SAOPAULO62170513randomcodepix6304A942" 
                    readOnly 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136example.com/pix/randomcode5204000053039865802BR5913MUHLSTORE6008SAOPAULO62170513randomcodepix6304A942");
                      toast.success("Código PIX copiado!");
                    }}
                  >
                    Copiar
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                O pagamento será confirmado automaticamente após a transferência PIX
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="boleto">
            <div className="py-6 space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Instruções:</h3>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-4">
                  <li>O boleto será enviado para seu e-mail</li>
                  <li>O prazo de vencimento é de 3 dias úteis</li>
                  <li>Após o pagamento, a compensação pode levar até 3 dias úteis</li>
                  <li>Seu pedido será processado após a confirmação do pagamento</li>
                </ol>
              </div>
              
              <div className="text-center">
                <p className="font-medium">Total a pagar: R$ {total.toFixed(2)}</p>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => {
                  toast.success("Boleto gerado! Verifique seu e-mail.");
                  onOpenChange(false);
                }}
              >
                Gerar Boleto
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
