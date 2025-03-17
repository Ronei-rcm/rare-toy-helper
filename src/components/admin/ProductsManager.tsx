
import { useState } from "react";
import { ToyItem } from "@/components/ToyCard";
import { ProductForm } from "./ProductForm";
import { ProductTable } from "./ProductTable";
import { ProductSearch } from "./ProductSearch";
import { toast } from "sonner";

// Dados fictícios
const mockProducts: ToyItem[] = [
  { id: "1", name: "Urso de Pelúcia Vintage", price: 89.90, image: "/placeholder.svg", category: "Bichinhos de Pelúcia", condition: "good", isRare: true },
  { id: "2", name: "Action Figure Colecionável", price: 129.99, image: "/placeholder.svg", category: "Action Figures", condition: "excellent", isRare: true },
  { id: "3", name: "Jogo de Tabuleiro Clássico", price: 59.90, image: "/placeholder.svg", category: "Jogos de Tabuleiro", condition: "good", isRare: false },
  { id: "4", name: "Console de Videogame Retrô", price: 299.90, image: "/placeholder.svg", category: "Videogames", condition: "fair", isRare: true },
  { id: "5", name: "Kit de Trem de Modelo", price: 189.50, image: "/placeholder.svg", category: "Modelos", condition: "good", isRare: false },
];

export default function ProductsManager() {
  const [products, setProducts] = useState<ToyItem[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<ToyItem | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product: ToyItem) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct: ToyItem) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Produto removido com sucesso!");
  };

  const handleEditProduct = (product: ToyItem) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-gray-500">Gerencie seu inventário de produtos</p>
        </div>
        <ProductForm 
          onAddProduct={handleAddProduct} 
          onUpdateProduct={handleUpdateProduct}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      
      <ProductSearch searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      
      <ProductTable 
        products={filteredProducts} 
        onDeleteProduct={handleDeleteProduct} 
        onEditProduct={handleEditProduct}
      />
    </div>
  );
}
