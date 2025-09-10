
import { toys } from "../data/toysData";
import { Loader2, PackageSearch } from "lucide-react";
import { ErrorBoundary } from "./ErrorBoundary";
import { useState, useEffect } from "react";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  estoque: number;
  condicao: string;
  raro: boolean;
}

function ProdutosListContent() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and use local data
    setTimeout(() => {
      setProdutos(toys);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {produtos.map((produto) => (
        <div key={produto.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
          <div className="aspect-square relative overflow-hidden">
            <img 
              src={produto.imagem} 
              alt={produto.nome}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {produto.raro && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                RARO
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {produto.condicao.toUpperCase()}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{produto.nome}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{produto.descricao}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{produto.categoria}</span>
              <span className="text-sm text-gray-500">Estoque: {produto.estoque}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-primary">
                R$ {produto.preco.toFixed(2)}
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Comprar
              </button>
            </div>
          </div>
        </div>
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
