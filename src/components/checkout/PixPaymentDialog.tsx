import { useState, useEffect } from 'react';
import { Copy, CheckCircle, Clock, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { toast } from '../../hooks/use-toast';
import { PixPayment } from '../../services/pixService';
import { Order, orderService } from '../../services/orderService';

interface PixPaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pixPayment: PixPayment;
  order: Order;
  onPaymentComplete: () => void;
}

export function PixPaymentDialog({ 
  isOpen, 
  onOpenChange, 
  pixPayment, 
  order, 
  onPaymentComplete 
}: PixPaymentDialogProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  

  useEffect(() => {
    const expiresAt = new Date(pixPayment.expires_at).getTime();
    
    const updateTimer = () => {
      const now = Date.now();
      const timeRemaining = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimeLeft(timeRemaining);
      
      if (timeRemaining === 0) {
        toast.error("PIX Expirado", "O prazo para pagamento via PIX expirou");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [pixPayment.expires_at]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixPayment.pix_key);
      setCopied(true);
      toast.success("Copiado!", "Chave PIX copiada para a área de transferência");
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Erro", "Erro ao copiar chave PIX");
    }
  };

  const simulatePayment = async () => {
    try {
      // Simular confirmação de pagamento
      await orderService.updatePaymentStatus(order.id, 'paid');
      await orderService.updateOrderStatus(order.id, 'processing');
      
      setPaymentConfirmed(true);
      
      toast.success("Pagamento Confirmado!", "Seu pagamento foi processado com sucesso");

      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    } catch (error) {
      toast.error("Erro", "Erro ao processar pagamento");
    }
  };

  if (paymentConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Pagamento Confirmado!</h3>
              <p className="text-muted-foreground mt-2">
                Pedido #{order.order_number} realizado com sucesso
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Pagamento via PIX
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Timer */}
          <Card>
            <CardContent className="flex items-center justify-center py-4">
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <p className="text-sm text-muted-foreground">Tempo restante</p>
                <p className="text-2xl font-mono font-bold">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* QR Code simulado */}
          <div className="text-center">
            <div className="w-48 h-48 mx-auto bg-muted border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">QR Code PIX</p>
              </div>
            </div>
          </div>

          {/* Chave PIX */}
          <div>
            <label className="text-sm font-medium">Chave PIX:</label>
            <div className="flex gap-2 mt-1">
              <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                {pixPayment.pix_key}
              </div>
              <Button
                variant="outline"
                onClick={copyPixKey}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
          </div>

          {/* Valor */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Valor a pagar</p>
            <p className="text-2xl font-bold">R$ {pixPayment.amount.toFixed(2)}</p>
          </div>

          {/* Instruções */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>1. Abra o app do seu banco</p>
            <p>2. Escaneie o QR Code ou copie a chave PIX</p>
            <p>3. Confirme o pagamento</p>
            <p>4. Aguarde a confirmação</p>
          </div>

          {/* Botão de simulação (apenas para demonstração) */}
          <div className="border-t pt-4">
            <Button
              onClick={simulatePayment}
              className="w-full"
              variant="outline"
            >
              🧪 Simular Pagamento (Demo)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}