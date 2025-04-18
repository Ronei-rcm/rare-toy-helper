
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mb-6">
          <ShoppingCart className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Parece que você ainda não adicionou nenhum item ao seu carrinho. 
          Explore nossa coleção de brinquedos raros para encontrar algo especial!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/collection">Ver Coleção</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="#lista-desejos">Ver Lista de Desejos</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
