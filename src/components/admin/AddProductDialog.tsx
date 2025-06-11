
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Brinquedo } from "../../types";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Brinquedo, "id">, id?: string) => void;
  product?: Brinquedo | null;
}

export default function AddProductDialog({ 
  open, 
  onClose, 
  onSubmit, 
  product 
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    nome: product?.nome || "",
    preco: product?.preco || 0,
    imagem: product?.imagem || "",
    categoria: product?.categoria || "",
    descricao: product?.descricao || "",
    estoque: product?.estoque || 0,
    condicao: product?.condicao || "good" as const,
    raro: product?.raro || false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }
    
    if (formData.preco <= 0) {
      newErrors.preco = "Preço deve ser maior que zero";
    }
    
    if (!formData.imagem.trim()) {
      newErrors.imagem = "URL da imagem é obrigatória";
    }
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = "Categoria é obrigatória";
    }

    if (formData.estoque < 0) {
      newErrors.estoque = "Estoque não pode ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Produto" : "Adicionar Novo Produto"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Nome do produto"
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
          </div>

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
              className={errors.preco ? "border-red-500" : ""}
            />
            {errors.preco && <span className="text-red-500 text-sm">{errors.preco}</span>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
              <SelectTrigger className={errors.categoria ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action-figures">Action Figures</SelectItem>
                <SelectItem value="bonecas">Bonecas</SelectItem>
                <SelectItem value="carrinhos">Carrinhos</SelectItem>
                <SelectItem value="lego">LEGO</SelectItem>
                <SelectItem value="pelucia">Pelúcia</SelectItem>
                <SelectItem value="jogos">Jogos</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria}</span>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="condicao">Condição</Label>
            <Select value={formData.condicao} onValueChange={(value) => handleInputChange("condicao", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mint">Mint</SelectItem>
                <SelectItem value="excellent">Excelente</SelectItem>
                <SelectItem value="good">Bom</SelectItem>
                <SelectItem value="fair">Regular</SelectItem>
              </SelectContent>
            </Select>
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
              className={errors.estoque ? "border-red-500" : ""}
            />
            {errors.estoque && <span className="text-red-500 text-sm">{errors.estoque}</span>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imagem">URL da Imagem *</Label>
            <Input
              id="imagem"
              value={formData.imagem}
              onChange={(e) => handleInputChange("imagem", e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className={errors.imagem ? "border-red-500" : ""}
            />
            {errors.imagem && <span className="text-red-500 text-sm">{errors.imagem}</span>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              placeholder="Descrição do produto"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="raro"
              checked={formData.raro}
              onCheckedChange={(checked) => handleInputChange("raro", checked)}
            />
            <Label htmlFor="raro">Item raro</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
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
