import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brinquedo } from "../../types";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
  preco: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Preço deve ser um número maior que zero"
  }),
  estoque: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Estoque não pode ser negativo"
  }),
  categoria: z.string().min(1, "Selecione uma categoria"),
  imagem: z.string().url("URL inválida").optional(),
});

interface AddProductDialogProps {
  onSubmit: (product: Omit<Brinquedo, "id">) => void;
  onClose: () => void;
  open?: boolean;
}

export default function AddProductDialog({ onSubmit, onClose, open = true }: AddProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      preco: "",
      estoque: "0",
      categoria: "",
      imagem: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const product: Omit<Brinquedo, "id"> = {
        nome: values.nome,
        descricao: values.descricao,
        preco: Number(values.preco),
        estoque: Number(values.estoque),
        categoria: values.categoria,
        imagem: values.imagem || "/placeholder.svg",
        condicao: "bom",
        raro: false,
      };

      await onSubmit(product);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
          <DialogDescription>
            Preencha os dados do produto. Campos com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
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
                    <Textarea placeholder="Descrição do produto" {...field} />
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
                  <FormLabel>Preço *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
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
                      min="0"
                      placeholder="0"
                      {...field}
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
                  <FormLabel>Categoria *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bonecos">Bonecos</SelectItem>
                      <SelectItem value="Jogos de Tabuleiro">Jogos de Tabuleiro</SelectItem>
                      <SelectItem value="Carrinhos">Carrinhos</SelectItem>
                      <SelectItem value="Pelúcias">Pelúcias</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imagem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adicionando..." : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
