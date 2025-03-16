
import { useState, useRef } from "react";
import { ToyItem } from "@/components/ToyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash, Filter, Upload, X } from "lucide-react";
import { toast } from "sonner";

// Dados fictícios
const mockProducts: ToyItem[] = [
  { id: "1", name: "Urso de Pelúcia Vintage", price: 89.90, image: "/placeholder.svg", category: "Bichinhos de Pelúcia", condition: "good", isRare: true },
  { id: "2", name: "Action Figure Colecionável", price: 129.99, image: "/placeholder.svg", category: "Action Figures", condition: "excellent", isRare: true },
  { id: "3", name: "Jogo de Tabuleiro Clássico", price: 59.90, image: "/placeholder.svg", category: "Jogos de Tabuleiro", condition: "good", isRare: false },
  { id: "4", name: "Console de Videogame Retrô", price: 299.90, image: "/placeholder.svg", category: "Videogames", condition: "fair", isRare: true },
  { id: "5", name: "Kit de Trem de Modelo", price: 189.50, image: "/placeholder.svg", category: "Modelos", condition: "good", isRare: false },
];

// Mapeamento de condições em português para inglês
const conditionMap = {
  "Perfeito": "mint",
  "Excelente": "excellent",
  "Bom": "good",
  "Regular": "fair"
} as const;

export default function ProductsManager() {
  const [products, setProducts] = useState<ToyItem[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newProduct, setNewProduct] = useState<Partial<ToyItem>>({
    name: "",
    price: 0,
    category: "",
    condition: "good",
    image: "/placeholder.svg",
    isRare: false
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar o tipo de arquivo
      if (!file.type.match('image.*')) {
        toast.error("Por favor, selecione apenas arquivos de imagem.");
        return;
      }

      // Verificar o tamanho do arquivo (limite de 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter menos de 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setNewProduct({...newProduct, image: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setNewProduct({...newProduct, image: "/placeholder.svg"});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        ...newProduct,
        id: String(Date.now()),
        image: newProduct.image || "/placeholder.svg",
      } as ToyItem;
      
      setProducts([...products, product]);
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

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Produto removido com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-gray-500">Gerencie seu inventário de produtos</p>
        </div>
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
                <div className="flex flex-col items-center gap-4">
                  {selectedImage ? (
                    <div className="relative w-full h-48">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="w-full h-full object-contain border rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-md w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Clique para fazer upload</p>
                      <p className="text-xs text-gray-400">PNG, JPG ou WEBP (max. 5MB)</p>
                    </div>
                  )}
                  <Input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
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
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <Input 
            type="search" 
            placeholder="Buscar produtos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Raridade</TableHead>
              <TableHead>Condição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.isRare ? "Raro" : "Comum"}</TableCell>
                  <TableCell>
                    {product.condition === "mint" ? "Perfeito" : 
                     product.condition === "excellent" ? "Excelente" : 
                     product.condition === "good" ? "Bom" : "Regular"}
                  </TableCell>
                  <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
