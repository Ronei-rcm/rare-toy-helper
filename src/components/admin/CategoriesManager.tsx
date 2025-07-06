
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  productCount: number;
}

// Dados fictícios
const mockCategories: Category[] = [
  { 
    id: "1", 
    name: "Action Figures", 
    description: "Figuras de ação colecionáveis de diversos universos", 
    imageUrl: "https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    productCount: 48 
  },
  { 
    id: "2", 
    name: "Bichinhos de Pelúcia", 
    description: "Pelúcias e brinquedos de pelúcia para todas as idades", 
    imageUrl: "https://images.unsplash.com/photo-1571968064364-430bc306dd5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    productCount: 32 
  },
  { 
    id: "3", 
    name: "Jogos de Tabuleiro", 
    description: "Jogos de tabuleiro clássicos e colecionáveis", 
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    productCount: 25 
  },
  { 
    id: "4", 
    name: "Videogames", 
    description: "Videogames retrô e vintage para colecionadores", 
    imageUrl: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    productCount: 56 
  },
  { 
    id: "5", 
    name: "Modelos", 
    description: "Kits de modelos e colecionáveis para montar", 
    productCount: 18 
  },
];

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'productCount'>>({
    name: "",
    description: "",
    imageUrl: ""
  });

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        ...newCategory,
        id: String(Date.now()),
        productCount: 0
      };
      
      setCategories([...categories, category]);
      setNewCategory({
        name: "",
        description: "",
        imageUrl: ""
      });
      setIsAddDialogOpen(false);
      toast.success("Categoria adicionada com sucesso!");
    } else {
      toast.error("O nome da categoria é obrigatório!");
    }
  };

  const handleEditCategory = () => {
    if (selectedCategory && newCategory.name.trim()) {
      const updatedCategories = categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...newCategory }
          : cat
      );
      
      setCategories(updatedCategories);
      setIsEditDialogOpen(false);
      setSelectedCategory(null);
      setNewCategory({
        name: "",
        description: "",
        imageUrl: ""
      });
      toast.success("Categoria atualizada com sucesso!");
    } else {
      toast.error("O nome da categoria é obrigatório!");
    }
  };

  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (categoryToDelete?.productCount > 0) {
      toast.error("Não é possível excluir uma categoria que possui produtos associados!");
      return;
    }
    
    setCategories(categories.filter(category => category.id !== id));
    toast.success("Categoria removida com sucesso!");
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl || ""
    });
    setIsEditDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
    setNewCategory({
      name: "",
      description: "",
      imageUrl: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Gerencie suas categorias de produtos</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Categoria</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Nome da categoria"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Descrição da categoria"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <ImageUploader
                  selectedImage={newCategory.imageUrl || ""}
                  onImageChange={(imageUrl) => setNewCategory({...newCategory, imageUrl})}
                  label="Imagem da Categoria (opcional)"
                  variant="compact"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeDialogs}>Cancelar</Button>
              <Button onClick={handleAddCategory}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nome *</Label>
              <Input
                id="edit-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Nome da categoria"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Descrição da categoria"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <ImageUploader
                selectedImage={newCategory.imageUrl || ""}
                onImageChange={(imageUrl) => setNewCategory({...newCategory, imageUrl})}
                label="Imagem da Categoria (opcional)"
                variant="compact"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialogs}>Cancelar</Button>
            <Button onClick={handleEditCategory}>Atualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {category.imageUrl ? (
                      <img 
                        src={category.imageUrl} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate">{category.description}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {category.productCount} produtos
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={category.productCount > 0}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
