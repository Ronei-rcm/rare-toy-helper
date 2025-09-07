import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { CartItem } from '@/services/cartService';
import { orderService } from '@/services/orderService';
import { pixService } from '@/services/pixService';
import { PixPaymentDialog } from './PixPaymentDialog';

const checkoutSchema = z.object({
  customer_name: z.string().min(1, 'Nome é obrigatório'),
  customer_email: z.string().email('Email inválido'),
  customer_phone: z.string().optional(),
  payment_method: z.enum(['pix', 'credit_card']),
  shipping_address: z.object({
    street: z.string().min(1, 'Endereço é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    zip_code: z.string().min(8, 'CEP é obrigatório')
  }),
  notes: z.string().optional()
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  cartItems: CartItem[];
  userId?: string;
  onOrderComplete: (orderId: string) => void;
}

export function CheckoutForm({ cartItems, userId, onOrderComplete }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [showPixPayment, setShowPixPayment] = useState(false);
  const [pixPaymentData, setPixPaymentData] = useState<any>(null);
  

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      payment_method: 'pix',
      shipping_address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zip_code: ''
      }
    }
  });

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setLoading(true);

      // Criar pedido
      const orderData = {
        user_id: userId,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        shipping_address: data.shipping_address,
        notes: data.notes,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.price
        }))
      };

      const order = await orderService.createOrder(orderData);

      // Processar pagamento
      if (data.payment_method === 'pix') {
        const pixPayment = await pixService.createPixPayment(order.id, totalAmount);
        setPixPaymentData({
          order,
          pixPayment
        });
        setShowPixPayment(true);
      } else {
        // Implementar pagamento com cartão (simulação)
        await orderService.updatePaymentStatus(order.id, 'paid');
        await orderService.updateOrderStatus(order.id, 'processing');
        
        toast.success("Pedido realizado!", "Pagamento processado com sucesso");
        
        onOrderComplete(order.id);
      }
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      toast.error("Erro", "Erro ao processar pedido");
    } finally {
      setLoading(false);
    }
  };

  const handlePixPaymentComplete = () => {
    setShowPixPayment(false);
    if (pixPaymentData?.order) {
      onOrderComplete(pixPaymentData.order.id);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Finalizar Compra</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Dados do cliente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados do Cliente</h3>
                
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customer_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customer_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Endereço de entrega */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço de Entrega</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="shipping_address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shipping_address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="shipping_address.complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping_address.neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="shipping_address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping_address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping_address.zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Método de pagamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Método de Pagamento</h3>
                
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="pix" id="pix" />
                            <label htmlFor="pix" className="flex items-center cursor-pointer">
                              <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                              PIX (Aprovação instantânea)
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="credit_card" id="credit_card" />
                            <label htmlFor="credit_card" className="flex items-center cursor-pointer">
                              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                              Cartão de Crédito
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Observações */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resumo do pedido */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>R$ {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Processando...' : 'Finalizar Pedido'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showPixPayment && pixPaymentData && (
        <PixPaymentDialog
          isOpen={showPixPayment}
          onOpenChange={setShowPixPayment}
          pixPayment={pixPaymentData.pixPayment}
          order={pixPaymentData.order}
          onPaymentComplete={handlePixPaymentComplete}
        />
      )}
    </>
  );
}