
import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartSection from '../components/client/cart/CartSection';
import CheckoutDialog from '../components/client/cart/CheckoutDialog';
import { toast } from 'sonner';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const subtotal = items.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
      return subtotal;
    };
    setCartTotal(calculateTotal());
  }, [items]);

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = async () => {
    try {
      // Here we would typically send the order to the backend
      // For now, we'll just clear the cart
      await clearCart();
      toast.success("Pedido finalizado com sucesso!");
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      toast.error("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  // Convert items to CartItem format
  const cartItems = items.map(item => ({
    id: item.id.toString(),
    productId: item.id.toString(),
    name: item.nome,
    price: item.preco,
    quantity: item.quantidade,
    nome: item.nome,
    preco: item.preco,
    quantidade: item.quantidade,
    image: item.imagem || '' // Usando valor padrão vazio caso imagem não exista
  }));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>
      
      <CartSection
        cartItems={cartItems}
        onRemoveItem={(id) => handleRemoveItem(parseInt(id))}
        onUpdateQuantity={(id, qty) => handleQuantityChange(parseInt(id), qty)}
        onCheckout={handleCheckout}
      />
      
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        total={cartTotal + (cartTotal > 0 ? 15 : 0)} // Add shipping if cart is not empty
        onCheckoutComplete={handleCheckoutComplete}
      />
    </div>
  );
}
