
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../services/productService";
import { LoadingSpinner } from "./products/LoadingSpinner";
import { ProductActions } from "./products/ProductActions";
import { ProductList } from "./products/ProductList";
import AddProductDialog from "./AddProductDialog";
import { EditProductDialog } from "./products/EditProductDialog";

export function ProductsManager() {
  const {
    products,
    loading,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct
  } = useProducts();
  
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setSelectedProduct(null);
    setAddDialogOpen(false);
    setEditDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <ProductActions onAddProduct={() => setAddDialogOpen(true)} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductList 
          products={products} 
          onDeleteProduct={handleDeleteProduct} 
          onEditProduct={handleOpenEditDialog}
        />
      )}

      <AddProductDialog
        open={addDialogOpen}
        onClose={handleCloseDialogs}
        onSubmit={handleAddProduct}
        product={null}
      />

      <EditProductDialog
        open={editDialogOpen}
        onClose={handleCloseDialogs}
        onSubmit={handleEditProduct}
        product={selectedProduct}
      />
    </div>
  );
}
