
import { Brinquedo } from "../../../types";
import AddProductDialog from "../AddProductDialog";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Brinquedo, "id">, id: string) => void;
  product: Brinquedo | null;
}

export function EditProductDialog({ 
  open, 
  onClose, 
  onSubmit, 
  product 
}: EditProductDialogProps) {
  const handleSubmit = (updatedProduct: Omit<Brinquedo, "id">) => {
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
