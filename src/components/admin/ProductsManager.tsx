import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Brinquedo, RespostaApi } from "../../types";
import { API_URL, getAuthHeaders } from "../../config/api";
import ProductList from "./ProductList";
import AddProductDialog from "./AddProductDialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function ProductsManager() {
  const [products, setProducts] = useState<Brinquedo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchProducts = async () => {
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
  };

  const handleAddProduct = async (product: Omit<Brinquedo, "id">) => {
    try {
      const response = await axios.post<RespostaApi<Brinquedo>>(`${API_URL}/produtos`, product, {
        headers: getAuthHeaders()
      });

      if (response.data.sucesso && response.data.dados) {
        setProducts([...products, response.data.dados]);
        toast.success("Produto adicionado com sucesso!");
        setDialogOpen(false);
      } else {
        toast.error(response.data.erro || "Erro ao adicionar produto");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto. Tente novamente mais tarde.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Produtos</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Produto
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ProductList products={products} onDelete={handleDeleteProduct} />
      )}

      <AddProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
