import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Clock, QrCode } from "lucide-react";
import { toast } from "sonner";

interface PixPaymentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  orderId: string;
  onPaymentComplete: () => void;
}

const PixPayment = ({ 
  isOpen, 
  onOpenChange, 
  amount, 
  orderId, 
  onPaymentComplete 
}: PixPaymentProps) => {
  const [pixKey, setPixKey] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      generatePixPayment();
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft > 0 && isOpen) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isOpen]);

  const generatePixPayment = async () => {
    setIsGenerating(true);
    
    // Simular geração do PIX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Gerar chave PIX simulada
    const simulatedPixKey = `00020126580014BR.GOV.BCB.PIX0136${Math.random().toString(36).substring(2, 15)}@muhlstore.com.br5204000053039865406${amount.toFixed(2)}5802BR5913MUHL STORE6009SAO PAULO62070503***6304`;
    
    setPixKey(simulatedPixKey);
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(simulatedPixKey)}`);
    setIsGenerating(false);
  };

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast.success("Chave PIX copiada!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Erro ao copiar chave PIX");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePaymentSuccess = () => {
    toast.success("Pagamento PIX confirmado!");
    onPaymentComplete();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              PIX
            </div>
            Pagamento PIX
          </DialogTitle>
        </DialogHeader>

        {isGenerating ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Gerando QR Code PIX...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Timer */}
            <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                <span className="text-sm">para pagamento</span>
              </div>
            </Card>

            {/* Valor */}
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">R$ {amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Pedido #{orderId}</p>
            </div>

            {/* QR Code */}
            <Card className="p-4">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
                  <QrCode className="w-4 h-4" />
                  <span className="font-medium">Escaneie o QR Code</span>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                  <img 
                    src={qrCode} 
                    alt="QR Code PIX" 
                    className="w-40 h-40 mx-auto"
                  />
                </div>
                
                <p className="text-sm text-gray-500">
                  Abra o app do seu banco e escaneie o código
                </p>
              </div>
            </Card>

            {/* Chave PIX para cópia */}
            <Card className="p-4">
              <div className="space-y-3">
                <p className="font-medium text-gray-700 text-center">
                  Ou copie a chave PIX:
                </p>
                
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-xs text-gray-600 font-mono break-all">
                    {pixKey.substring(0, 50)}...
                  </p>
                </div>
                
                <Button
                  onClick={copyPixKey}
                  variant="outline"
                  className="w-full"
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar chave PIX
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Instruções */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Como pagar:</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Abra o app do seu banco</li>
                <li>2. Escaneie o QR Code ou cole a chave PIX</li>
                <li>3. Confirme o pagamento</li>
                <li>4. Aguarde a confirmação automática</li>
              </ol>
            </Card>

            {/* Botão de teste para simular pagamento */}
            <Button
              onClick={handlePaymentSuccess}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
            >
              🧪 Simular Pagamento (Teste)
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PixPayment;