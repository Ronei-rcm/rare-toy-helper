
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

interface ProductActionsProps {
  onAddProduct: () => void;
}

export function ProductActions({ onAddProduct }: ProductActionsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Produtos</h2>
      <Button onClick={onAddProduct}>
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Produto
      </Button>
    </div>
  );
}
