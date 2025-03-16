
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
}

export function ProductTable({ products, onDeleteProduct }: ProductTableProps) {
  // Função para renderizar a condição em português
  const renderCondition = (condition: string) => {
    switch(condition) {
      case "mint": return "Perfeito";
      case "excellent": return "Excelente";
      case "good": return "Bom";
      case "fair": return "Regular";
      default: return condition;
    }
  };

  return (
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
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Nenhum produto encontrado
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
                <TableCell>{product.isRare ? "Raro" : "Comum"}</TableCell>
                <TableCell>{renderCondition(product.condition)}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDeleteProduct(product.id)}
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
