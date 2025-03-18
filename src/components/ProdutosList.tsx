import { useQuery } from "@tanstack/react-query";
import { produtosAPI } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PackageSearch } from "lucide-react";
import { ErrorBoundary } from "./ErrorBoundary";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
}

function ProdutosListContent() {
  const { data, isLoading, error } = useQuery<Produto[]>({
    queryKey: ["produtos"],
    queryFn: produtosAPI.listarTodos,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Garantir que data seja sempre um array
  const produtos = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    throw error;
  }

  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500">
        <PackageSearch className="h-12 w-12 mb-2" />
        <p>Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {produtos.map((produto) => (
        <Card key={produto.id}>
          <CardHeader>
            <CardTitle>{produto.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{produto.descricao}</p>
            <p className="text-lg font-bold mt-2">
              R$ {produto.preco.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProdutosList() {
  return (
    <ErrorBoundary>
      <ProdutosListContent />
    </ErrorBoundary>
  );
}
