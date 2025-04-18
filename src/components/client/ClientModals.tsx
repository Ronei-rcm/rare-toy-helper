
import OrderDetailsDialog from "./orders/OrderDetailsDialog";
import CheckoutDialog from "./cart/CheckoutDialog";
import { useClientContext } from "../../contexts/ClientContext";

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
        isOpen={isOrderDetailsOpen!}
        onOpenChange={setIsOrderDetailsOpen!}
        order={selectedOrder}
      />
      
      {/* Modal de checkout */}
      <CheckoutDialog
        isOpen={isCheckoutOpen!}
        onOpenChange={setIsCheckoutOpen!}
        total={cartTotal || 0}
        onCheckoutComplete={handleCheckoutComplete!}
      />
    </>
  );
}
