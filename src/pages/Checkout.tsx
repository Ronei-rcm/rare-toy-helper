import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { cartService, CartItem } from '../services/cartService';
import { supabase } from '../integrations/supabase/client';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar usuário logado
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (!data.user) {
        navigate('/login');
      }
    });
  }, [navigate]);

  useEffect(() => {
    const loadCartItems = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const items = await cartService.getCartItems(user.id);
        setCartItems(items);
        
        if (items.length === 0) {
          navigate('/produtos');
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        navigate('/produtos');
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [user, navigate]);

  const handleOrderComplete = (orderId: string) => {
    // Limpar carrinho
    if (user?.id) {
      cartService.clearCart(user.id);
    }
    
    // Redirecionar para página de sucesso
    navigate(`/pedido/${orderId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Finalizar Compra</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de checkout */}
          <div className="lg:col-span-2">
            <CheckoutForm
              cartItems={cartItems}
              userId={user?.id}
              onOrderComplete={handleOrderComplete}
            />
          </div>

          {/* Resumo do pedido */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.product.image_url && (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total:</span>
                    <span>R$ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}