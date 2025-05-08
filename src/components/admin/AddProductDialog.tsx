
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Brinquedo } from "../../types";

const categoryOptions = [
  { value: "bonecas", label: "Bonecas" },
  { value: "carrinhos", label: "Carrinhos" },
  { value: "jogos", label: "Jogos" },
  { value: "pelucias", label: "Pelúcias" },
  { value: "outros", label: "Outros" },
];

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  descricao: z.string().optional(),
  preco: z.number().min(0.01, {
    message: "Preço deve ser maior que zero.",
  }),
  estoque: z.number().min(0, {
    message: "Estoque não pode ser negativo.",
  }),
  categoria: z.string().min(1, {
    message: "Categoria é obrigatória.",
  }),
  imagem: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Brinquedo, "id">) => void;
  product?: Brinquedo | null;
}

export default function AddProductDialog({ 
  open, 
  onClose, 
  onSubmit, 
  product 
}: AddProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoria: '',
    imagem: '',
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
    mode: "onChange"
  });

  const resetForm = () => {
    setFormValues({
      nome: '',
      descricao: '',
      preco: 0,
      estoque: 0,
      categoria: '',
      imagem: '',
    });
    form.reset(formValues);
  };
  
  // Atualiza o formulário quando um produto é passado para edição
  useEffect(() => {
    if (product) {
      setFormValues({
        nome: product.nome,
        descricao: product.descricao || '',
        preco: product.preco,
        estoque: product.estoque,
        categoria: product.categoria,
        imagem: product.imagem || '',
      });
    } else {
      resetForm();
    }
  }, [product]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Fix: Replace validate with handleSubmit and manual validation
      const isValid = await form.trigger();
      const values = form.getValues();

      if (isValid) {
        const newProduct: Omit<Brinquedo, "id"> = {
          nome: values.nome,
          descricao: values.descricao,
          preco: values.preco,
          estoque: values.estoque,
          categoria: values.categoria,
          imagem: values.imagem || '',
        };
        
        onSubmit(newProduct);
        onClose();
        resetForm();
      } else {
        toast.error("Por favor, corrija os erros no formulário.");
      }
    } catch (error) {
      toast.error("Erro ao adicionar produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues({ ...formValues, imagem: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
          <DialogDescription>
            {product 
              ? 'Edite os detalhes do produto abaixo' 
              : 'Preencha os detalhes do novo produto abaixo'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} value={formValues.nome} onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do produto"
                      className="resize-none"
                      {...field}
                      value={formValues.descricao}
                      onChange={(e) => setFormValues({ ...formValues, descricao: e.target.value })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      value={formValues.preco?.toString()}
                      onChange={(e) => setFormValues({ ...formValues, preco: parseFloat(e.target.value) })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estoque"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      value={formValues.estoque?.toString()}
                      onChange={(e) => setFormValues({ ...formValues, estoque: parseInt(e.target.value) })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={(value) => setFormValues({ ...formValues, categoria: value })} defaultValue={formValues.categoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor="image">Imagem</Label>
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {formValues.imagem && (
                <img
                  src={formValues.imagem}
                  alt="Preview"
                  className="mt-2 rounded-md object-cover"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              )}
            </div>
          </div>
        </Form>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                {product ? 'Salvando...' : 'Adicionando...'}
              </>
            ) : (
              product ? 'Salvar Alterações' : 'Adicionar Produto'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
