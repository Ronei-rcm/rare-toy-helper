
import { useClientContext } from "@/contexts/ClientContext";
import OrderDetailsDialog from "@/components/client/orders/OrderDetailsDialog";
import CheckoutDialog from "@/components/client/cart/CheckoutDialog";

export default function ClientModals() {
  const {
    selectedOrder,
    isOrderDetailsOpen,
    setIsOrderDetailsOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartTotal,
    handleCheckoutComplete
  } = useClientContext();

  return (
    <>
      {/* Modal de detalhes do pedido */}
      <OrderDetailsDialog
        isOpen={isOrderDetailsOpen}
        onOpenChange={setIsOrderDetailsOpen}
        order={selectedOrder}
      />
      
      {/* Modal de checkout */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        total={cartTotal}
        onCheckoutComplete={handleCheckoutComplete}
      />
    </>
  );
}
