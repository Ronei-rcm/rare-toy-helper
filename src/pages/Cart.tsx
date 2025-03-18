import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { formatCurrency } from '../lib/utils';

interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      return items.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    };
    setTotal(calculateTotal());
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.nome}</h3>
                    <p className="text-gray-600">{formatCurrency(item.preco)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantidade - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantidade}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantidade + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: {formatCurrency(total)}
            </div>
            <Button size="lg" onClick={() => window.location.href = '/checkout'}>
              Finalizar Compra
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
