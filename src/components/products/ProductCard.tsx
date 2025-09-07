import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/services/productService';
import { cartService } from '@/services/cartService';
import { supabase } from '@/integrations/supabase/client';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  

  // Verificar usuário logado
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Login necessário", "Faça login para adicionar produtos ao carrinho");
      return;
    }

    try {
      setLoading(true);
      await cartService.addToCart(user.id, product.id, 1);
      
      toast.success("Sucesso!", "Produto adicionado ao carrinho");

      onAddToCart?.(product.id);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error("Erro", "Erro ao adicionar produto ao carrinho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}
          
          {product.featured && (
            <Badge className="absolute top-2 left-2">
              Destaque
            </Badge>
          )}
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {product.category.name}
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {product.stock_quantity > 0 ? (
                <span className="text-green-600">Em estoque</span>
              ) : (
                <span className="text-red-600">Sem estoque</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={loading || product.stock_quantity <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </Button>
      </CardFooter>
    </Card>
  );
}