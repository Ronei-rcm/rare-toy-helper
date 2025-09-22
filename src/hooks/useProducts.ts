
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "../integrations/supabase/client";
import { Product } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug)
        `)
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao carregar produtos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddProduct = useCallback(async (productData: any) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: productData.nome,
          description: productData.descricao,
          price: productData.preco,
          stock_quantity: productData.estoque || 0,
          category_id: productData.categoria,
          image_url: productData.imagem,
          active: true,
          featured: productData.raro || false,
          tags: productData.condicao ? [productData.condicao] : null
        }])
        .select(`
          *,
          category:categories(id, name, slug)
        `)
        .single();

      if (error) throw error;
      
      setProducts(prev => [data, ...prev]);
      toast.success("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto. Tente novamente mais tarde.");
    }
  }, []);

  const handleDeleteProduct = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      toast.error("Erro ao remover produto. Tente novamente mais tarde.");
    }
  }, []);

  const handleEditProduct = useCallback(async (productData: any, id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: productData.nome,
          description: productData.descricao,
          price: productData.preco,
          stock_quantity: productData.estoque || 0,
          category_id: productData.categoria,
          image_url: productData.imagem,
          featured: productData.raro || false,
          tags: productData.condicao ? [productData.condicao] : null
        })
        .eq('id', id)
        .select(`
          *,
          category:categories(id, name, slug)
        `)
        .single();

      if (error) throw error;
      
      setProducts(prev => prev.map(p => p.id === id ? data : p));
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      toast.error("Erro ao editar produto. Tente novamente mais tarde.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct
  };
}
