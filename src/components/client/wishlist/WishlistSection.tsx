
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistItem } from "@/types/client";

interface WishlistSectionProps {
  wishlist: WishlistItem[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}

export default function WishlistSection({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Lista de Desejos</h2>
        </div>
        
        <div className="p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Sua lista de desejos está vazia</h3>
              <p className="text-gray-500 mb-4">Adicione itens à sua lista de desejos enquanto navega pela loja.</p>
              <Button asChild>
                <Link to="/collection">Explorar Produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="flex border rounded-md overflow-hidden">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button 
                        onClick={() => onRemoveFromWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-primary font-medium mt-1">R$ {item.price.toFixed(2)}</p>
                    <div className="mt-auto pt-2">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => onAddToCart(item)}
                      >
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
