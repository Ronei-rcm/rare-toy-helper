import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ProductCard } from '../components/products/ProductCard';
import { CartDrawer } from '../components/cart/CartDrawer';
import { productService, Product, Category } from '../services/productService';
import { supabase } from '../integrations/supabase/client';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [user, setUser] = useState<any>(null);

  // Verificar usuário logado
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // Carregar produtos e categorias
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getAllCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrar produtos
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    // Filtrar por busca
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <CartDrawer userId={user?.id} />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div className="w-full md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Limpar filtros */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Produtos */}
      <div className="container mx-auto px-4 pb-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum produto encontrado.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} produto(s) encontrado(s)
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => {
                    // Atualizar carrinho se necessário
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}