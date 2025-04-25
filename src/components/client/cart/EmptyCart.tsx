
import { ShoppingCart } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <ShoppingCart className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Seu carrinho está vazio</h2>
      <p className="text-gray-500 text-center mb-6">
        Explore nossa loja e descubra produtos incríveis para adicionar ao seu carrinho.
      </p>
      <Button onClick={() => navigate("/produtos")}>
        Continuar Comprando
      </Button>
    </div>
  );
}
