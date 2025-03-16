
import { useState } from "react";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ProductFormProps {
  onAddProduct: (product: ToyItem) => void;
}

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [newProduct, setNewProduct] = useState<Partial<ToyItem>>({
    name: "",
    price: 0,
    category: "",
    condition: "good",
    image: "/placeholder.svg",
    isRare: false
  });

  const handleImageChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setNewProduct({...newProduct, image: imageUrl});
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        ...newProduct,
        id: String(Date.now()),
        image: newProduct.image || "/placeholder.svg",
      } as ToyItem;
      
      onAddProduct(product);
      setNewProduct({
        name: "",
        price: 0,
        category: "",
        condition: "good",
        image: "/placeholder.svg",
        isRare: false
      });
      setSelectedImage(null);
      setIsAddDialogOpen(false);
      toast.success("Produto adicionado com sucesso!");
    } else {
      toast.error("Preencha pelo menos o nome e o preço do produto!");
    }
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-image">Imagem do Produto</Label>
            <ImageUploader 
              selectedImage={selectedImage || newProduct.image || "/placeholder.svg"} 
              onImageChange={handleImageChange} 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Preço</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Categoria</Label>
            <Input
              id="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="condition" className="text-right">Condição</Label>
            <select
              id="condition"
              value={newProduct.condition}
              onChange={(e) => setNewProduct({...newProduct, condition: e.target.value as "mint" | "excellent" | "good" | "fair"})}
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
                checked={newProduct.isRare}
                onChange={(e) => setNewProduct({...newProduct, isRare: e.target.checked})}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="isRare">Produto raro</label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddProduct}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
