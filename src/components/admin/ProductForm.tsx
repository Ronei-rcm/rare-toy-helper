
import { useState, useEffect } from "react";
import { ToyItem } from "@/components/ToyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "./ImageUploader";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";

interface ProductFormProps {
  onAddProduct: (product: ToyItem) => void;
  onUpdateProduct?: (product: ToyItem) => void;
  editingProduct?: ToyItem | null;
  onCancelEdit?: () => void;
}

export function ProductForm({ 
  onAddProduct, 
  onUpdateProduct, 
  editingProduct, 
  onCancelEdit 
}: ProductFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const defaultProductState: Partial<ToyItem> = {
    name: "",
    price: 0,
    category: "",
    condition: "good" as const,
    image: "/placeholder.svg",
    isRare: false
  };
  
  const [formData, setFormData] = useState<Partial<ToyItem>>(defaultProductState);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
      setSelectedImage(editingProduct.image);
      setIsDialogOpen(true);
    }
  }, [editingProduct]);

  const handleImageChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setFormData({...formData, image: imageUrl});
  };

  const handleSubmit = () => {
    if (formData.name && formData.price) {
      if (editingProduct && onUpdateProduct) {
        // Modo de edição
        const updatedProduct = {
          ...formData,
          id: editingProduct.id,
          image: formData.image || "/placeholder.svg",
        } as ToyItem;
        
        onUpdateProduct(updatedProduct);
        toast.success("Produto atualizado com sucesso!");
      } else {
        // Modo de adição
        const product = {
          ...formData,
          id: String(Date.now()),
          image: formData.image || "/placeholder.svg",
        } as ToyItem;
        
        onAddProduct(product);
        toast.success("Produto adicionado com sucesso!");
      }
      
      resetForm();
      setIsDialogOpen(false);
    } else {
      toast.error("Preencha pelo menos o nome e o preço do produto!");
    }
  };

  const resetForm = () => {
    setFormData(defaultProductState);
    setSelectedImage(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open && editingProduct && onCancelEdit) {
      onCancelEdit();
      resetForm();
    }
  };

  const handleConditionChange = (value: string) => {
    // Ensure condition is one of the allowed values
    const condition = value as 'mint' | 'excellent' | 'good' | 'fair';
    setFormData({...formData, condition});
  };

  const dialogTitle = editingProduct ? "Editar Produto" : "Adicionar Novo Produto";
  const buttonText = editingProduct ? "Salvar Alterações" : "Salvar";
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button>
          {!editingProduct && (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Produto
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-image">Imagem do Produto</Label>
            <ImageUploader 
              selectedImage={selectedImage || formData.image || "/placeholder.svg"} 
              onImageChange={handleImageChange} 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Preço</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Categoria</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="condition" className="text-right">Condição</Label>
            <select
              id="condition"
              value={formData.condition}
              onChange={(e) => handleConditionChange(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="mint">Perfeito</option>
              <option value="excellent">Excelente</option>
              <option value="good">Bom</option>
              <option value="fair">Regular</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isRare" className="text-right">Raridade</Label>
            <div className="col-span-3 flex items-center">
              <input
                type="checkbox"
                id="isRare"
                checked={formData.isRare}
                onChange={(e) => setFormData({...formData, isRare: e.target.checked})}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="isRare">Produto raro</label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
