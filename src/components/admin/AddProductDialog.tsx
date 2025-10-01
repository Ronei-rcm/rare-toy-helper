
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Product } from "../../services/productService";
import { ImageUploader } from "./ImageUploader";

// Secure validation schema
const productSchema = z.object({
  nome: z.string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(200, "Nome deve ter no máximo 200 caracteres"),
  preco: z.number()
    .positive("Preço deve ser maior que zero")
    .max(1000000, "Preço inválido"),
  imagem: z.string()
    .trim()
    .url("URL de imagem inválida")
    .min(1, "Imagem é obrigatória"),
  categoria: z.string()
    .trim()
    .min(1, "Categoria é obrigatória"),
  descricao: z.string()
    .trim()
    .max(2000, "Descrição deve ter no máximo 2000 caracteres")
    .optional()
    .or(z.literal("")),
  estoque: z.number()
    .int("Estoque deve ser um número inteiro")
    .min(0, "Estoque não pode ser negativo")
    .max(999999, "Estoque inválido"),
  condicao: z.enum(["mint", "excellent", "good", "fair"]),
  raro: z.boolean()
});

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: any, id?: string) => void;
  product?: Product | null;
}

export default function AddProductDialog({ 
  open, 
  onClose, 
  onSubmit, 
  product 
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    nome: product?.name || "",
    preco: Number(product?.price) || 0,
    imagem: product?.image_url || "",
    categoria: product?.category_id || "",
    descricao: product?.description || "",
    estoque: product?.stock_quantity || 0,
    condicao: (product?.tags && product.tags[0]) || "good" as const,
    raro: product?.featured || false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    try {
      productSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    onSubmit(formData, product?.id);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      preco: 0,
      imagem: "",
      categoria: "",
      descricao: "",
      estoque: 0,
      condicao: "good",
      raro: false
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Produto" : "Adicionar Novo Produto"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value.slice(0, 200))}
                placeholder="Nome do produto (máximo 200 caracteres)"
                className={errors.nome ? "border-destructive" : ""}
                maxLength={200}
              />
              {errors.nome && <span className="text-destructive text-sm">{errors.nome}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="preco">Preço *</Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco}
                  onChange={(e) => handleInputChange("preco", parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className={errors.preco ? "border-destructive" : ""}
                />
                {errors.preco && <span className="text-destructive text-sm">{errors.preco}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="estoque">Estoque</Label>
                <Input
                  id="estoque"
                  type="number"
                  min="0"
                  value={formData.estoque}
                  onChange={(e) => handleInputChange("estoque", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className={errors.estoque ? "border-destructive" : ""}
                />
                {errors.estoque && <span className="text-destructive text-sm">{errors.estoque}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                  <SelectTrigger className={errors.categoria ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="action-figures">Action Figures</SelectItem>
                    <SelectItem value="bonecas">Bonecas</SelectItem>
                    <SelectItem value="carrinhos">Carrinhos</SelectItem>
                    <SelectItem value="lego">LEGO</SelectItem>
                    <SelectItem value="pelucia">Pelúcia</SelectItem>
                    <SelectItem value="jogos">Jogos</SelectItem>
                    <SelectItem value="nintendo">Nintendo</SelectItem>
                    <SelectItem value="pokemon">Pokémon</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                  </SelectContent>
                </Select>
                {errors.categoria && <span className="text-destructive text-sm">{errors.categoria}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="condicao">Condição</Label>
                <Select value={formData.condicao} onValueChange={(value) => handleInputChange("condicao", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mint">Mint (Perfeito)</SelectItem>
                    <SelectItem value="excellent">Excelente</SelectItem>
                    <SelectItem value="good">Bom</SelectItem>
                    <SelectItem value="fair">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <ImageUploader
                selectedImage={formData.imagem}
                onImageChange={(imageUrl) => handleInputChange("imagem", imageUrl)}
                label="Imagem do Produto *"
              />
              {errors.imagem && <span className="text-destructive text-sm">{errors.imagem}</span>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value.slice(0, 2000))}
                placeholder="Descrição detalhada do produto, condição, história, etc. (máximo 2000 caracteres)"
                rows={4}
                className="resize-none"
                maxLength={2000}
              />
              <span className="text-xs text-muted-foreground">
                {formData.descricao.length}/2000 caracteres
              </span>
              {errors.descricao && <span className="text-destructive text-sm">{errors.descricao}</span>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="raro"
                checked={formData.raro}
                onCheckedChange={(checked) => handleInputChange("raro", checked)}
              />
              <Label htmlFor="raro" className="flex items-center gap-2">
                Item raro ou colecionável
                <span className="text-xs text-muted-foreground">(Destaque especial na loja)</span>
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? "Atualizar" : "Adicionar"} Produto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
