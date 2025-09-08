import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';
import { Product } from '../../services/productService';
import { cartService } from '../../services/cartService';
import { supabase } from '../../integrations/supabase/client';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Verificar usuário logado
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Erro", "Faça login para adicionar itens ao carrinho");
      return;
    }

    try {
      setLoading(true);
      await cartService.addToCart(user.id, product.id, 1);
      toast.success("Sucesso", "Produto adicionado ao carrinho");
      onAddToCart?.(product.id);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error("Erro", "Erro ao adicionar produto ao carrinho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">
            {product.name}
          </h3>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </span>
            {product.stock_quantity > 0 ? (
              <span className="text-xs text-muted-foreground">
                {product.stock_quantity} em estoque
              </span>
            ) : (
              <Badge variant="destructive" className="w-fit">
                Esgotado
              </Badge>
            )}
          </div>

          {product.featured && (
            <Badge variant="secondary">
              Destaque
            </Badge>
          )}
        </div>

        {product.category && (
          <Badge variant="outline" className="mb-3">
            {product.category.name}
          </Badge>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={loading || product.stock_quantity === 0}
        >
          {loading ? (
            "Adicionando..."
          ) : product.stock_quantity === 0 ? (
            "Esgotado"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}