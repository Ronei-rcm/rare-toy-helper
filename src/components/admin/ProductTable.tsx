import { ToyItem } from "@/components/ToyCard";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ProductTableProps {
  products: ToyItem[];
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: ToyItem) => void;
}

export function ProductTable({ products, onDeleteProduct, onEditProduct }: ProductTableProps) {
  // Função para renderizar a condição em português
  const renderCondition = (condition: string) => {
    switch(condition) {
      case "novo": return "Novo";
      case "otimo": return "Ótimo";
      case "bom": return "Bom";
      case "regular": return "Regular";
      default: return condition;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Nenhum brinquedo encontrado
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
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
                <TableCell>{product.stock || 0}</TableCell>
                <TableCell>{renderCondition(product.condition)}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEditProduct(product)}
                    title="Editar brinquedo"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDeleteProduct(product.id)}
                    title="Remover brinquedo"
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
  );
}
