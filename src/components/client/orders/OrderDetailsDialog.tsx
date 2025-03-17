
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/client";

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export default function OrderDetailsDialog({
  isOpen,
  onOpenChange,
  order,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "processando": return "bg-blue-100 text-blue-800";
      case "enviado": return "bg-purple-100 text-purple-800";
      case "entregue": return "bg-green-100 text-green-800";
      case "cancelado": return "bg-red-100 text-red-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido #{order.id}</DialogTitle>
          <DialogDescription>
            Detalhes completos do seu pedido
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-sm font-medium">Status:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          
          <div className="border-b pb-2">
            <span className="text-sm font-medium">Data do pedido:</span>
            <p className="text-sm">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium">Itens:</span>
            <ul className="mt-2 space-y-2">
              {order.items.map((item) => (
                <li key={item.id} className="text-sm flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t pt-2 flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">R$ {order.total.toFixed(2)}</span>
          </div>
          
          {order.trackingCode && (
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm font-medium text-blue-700">Código de rastreio:</p>
              <p className="text-sm">{order.trackingCode}</p>
              <Button variant="link" className="text-blue-700 p-0 h-auto text-sm mt-1">
                Rastrear meu pedido
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
