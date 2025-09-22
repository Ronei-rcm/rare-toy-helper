
import { Product } from "../../../services/productService";
import AddProductDialog from "../AddProductDialog";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: any, id: string) => void;
  product: Product | null;
}

export function EditProductDialog({ 
  open, 
  onClose, 
  onSubmit, 
  product 
}: EditProductDialogProps) {
  const handleSubmit = (updatedProduct: any) => {
    if (product) {
      onSubmit(updatedProduct, product.id);
    }
  };

  return (
    <AddProductDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      product={product}
    />
  );
}
