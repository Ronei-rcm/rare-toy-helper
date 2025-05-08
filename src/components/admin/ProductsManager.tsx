
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Brinquedo } from "../../types";
import { LoadingSpinner } from "./products/LoadingSpinner";
import { ProductActions } from "./products/ProductActions";
import { ProductList } from "./products/ProductList";
import AddProductDialog from "./AddProductDialog";

export function ProductsManager() {
  const {
    products,
    loading,
    dialogOpen,
    setDialogOpen,
    handleAddProduct,
    handleDeleteProduct
  } = useProducts();
  
  const [selectedProduct, setSelectedProduct] = useState<Brinquedo | null>(null);

  const handleEditProduct = (product: Brinquedo) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <ProductActions onAddProduct={() => setDialogOpen(true)} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductList 
          products={products} 
          onDeleteProduct={handleDeleteProduct} 
          onEditProduct={handleEditProduct}
        />
      )}

      <AddProductDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleAddProduct}
        product={selectedProduct}
      />
    </div>
  );
}
