import { useEffect, useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';
import { cartService, CartItem } from '../../services/cartService';
import { supabase } from '../../integrations/supabase/client';

interface CartDrawerProps {
  userId?: string;
}

export function CartDrawer({ userId }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  

  const fetchCartItems = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const items = await cartService.getCartItems(userId);
      setCartItems(items);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      toast.error("Erro", "Erro ao carregar itens do carrinho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!userId) return;

    try {
      if (newQuantity <= 0) {
        await cartService.removeFromCart(userId, productId);
      } else {
        await cartService.updateCartItemQuantity(userId, productId, newQuantity);
      }
      
      await fetchCartItems();
      toast.success("Sucesso", "Carrinho atualizado");
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
      toast.error("Erro", "Erro ao atualizar carrinho");
    }
  };

  const removeItem = async (productId: string) => {
    if (!userId) return;

    try {
      await cartService.removeFromCart(userId, productId);
      await fetchCartItems();
      toast.success("Sucesso", "Item removido do carrinho");
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast.error("Erro", "Erro ao remover item do carrinho");
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    try {
      await cartService.clearCart(userId);
      setCartItems([]);
      toast.success("Sucesso", "Carrinho limpo");
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error("Erro", "Erro ao limpar carrinho");
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Carrinho de Compras
            {cartItems.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart}>
                Limpar
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mb-2" />
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    {item.product.image_url && (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center mt-2 space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product_id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total:</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setIsOpen(false)}
              >
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}