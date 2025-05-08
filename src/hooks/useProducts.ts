
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Brinquedo, RespostaApi } from "../types";
import { API_URL, getAuthHeaders } from "../config/api";

export function useProducts() {
  const [products, setProducts] = useState<Brinquedo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get<RespostaApi<Brinquedo[]>>(`${API_URL}/produtos`, {
        headers: getAuthHeaders()
      });

      if (response.data.sucesso && response.data.dados) {
        setProducts(response.data.dados);
      } else {
        toast.error(response.data.erro || "Erro ao carregar produtos");
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao carregar produtos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddProduct = useCallback(async (product: Omit<Brinquedo, "id">) => {
    try {
      const formData = new FormData();
      formData.append('nome', product.nome);
      formData.append('descricao', product.descricao || '');
      formData.append('preco', product.preco.toString());
      formData.append('estoque', product.estoque.toString());
      formData.append('categoria_id', product.categoria);
      formData.append('condicao', product.condicao);
      formData.append('raro', product.raro.toString());

      if (product.imagem && product.imagem.startsWith('data:image')) {
        const blob = await fetch(product.imagem).then(r => r.blob());
        formData.append('imagem', blob, 'produto.jpg');
      }

      const response = await axios.post<RespostaApi<Brinquedo>>(`${API_URL}/produtos`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.sucesso && response.data.dados) {
        setProducts([...products, response.data.dados]);
        toast.success("Produto adicionado com sucesso!");
      } else {
        toast.error(response.data.erro || "Erro ao adicionar produto");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto. Tente novamente mais tarde.");
    }
  }, [products]);

  const handleDeleteProduct = useCallback(async (id: string) => {
    try {
      const response = await axios.delete<RespostaApi<void>>(`${API_URL}/produtos/${id}`, {
        headers: getAuthHeaders()
      });

      if (response.data.sucesso) {
        setProducts(products.filter(p => p.id !== id));
        toast.success("Produto removido com sucesso!");
      } else {
        toast.error(response.data.erro || "Erro ao remover produto");
      }
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      toast.error("Erro ao remover produto. Tente novamente mais tarde.");
    }
  }, [products]);

  const handleEditProduct = useCallback(async (product: Omit<Brinquedo, "id">, id: string) => {
    try {
      const formData = new FormData();
      formData.append('nome', product.nome);
      formData.append('descricao', product.descricao || '');
      formData.append('preco', product.preco.toString());
      formData.append('estoque', product.estoque.toString());
      formData.append('categoria_id', product.categoria);
      formData.append('condicao', product.condicao);
      formData.append('raro', product.raro.toString());

      if (product.imagem && product.imagem.startsWith('data:image')) {
        const blob = await fetch(product.imagem).then(r => r.blob());
        formData.append('imagem', blob, 'produto.jpg');
      }

      const response = await axios.put<RespostaApi<Brinquedo>>(`${API_URL}/produtos/${id}`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.sucesso && response.data.dados) {
        setProducts(products.map(p => p.id === id ? response.data.dados! : p));
        toast.success("Produto atualizado com sucesso!");
      } else {
        toast.error(response.data.erro || "Erro ao atualizar produto");
      }
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      toast.error("Erro ao editar produto. Tente novamente mais tarde.");
    }
  }, [products]);

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
