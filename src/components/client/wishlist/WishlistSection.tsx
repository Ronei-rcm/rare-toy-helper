
import React from 'react';
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import { WishlistItem, CartItem } from "../../types/client";

interface WishlistSectionProps {
  wishlist: WishlistItem[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: CartItem) => void;
}

export default function WishlistSection({ 
  wishlist, 
  onRemoveFromWishlist, 
  onAddToCart 
}: WishlistSectionProps) {
  const handleAddToCart = (item: WishlistItem) => {
    const cartItem: CartItem = {
      id: item.id,
      productId: item.productId,
      name: item.name || item.nome || "",
      price: item.price || item.preco || 0,
      quantity: 1,
      quantidade: 1,
      image: item.image || item.imagem
    };
    
    onAddToCart(cartItem);
    // Optionally remove from wishlist after adding to cart
    // onRemoveFromWishlist(item.productId);
  };

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
        
        {wishlist.length === 0 ? (
          <div className="p-8 text-center">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Sua lista de desejos está vazia</h3>
            <p className="text-gray-500 mb-4">Adicione produtos à sua lista para visualizá-los aqui.</p>
            <Button asChild>
              <a href="/collection">Explorar Produtos</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className="border rounded-lg overflow-hidden flex flex-col"
              >
                <div className="h-48 bg-gray-100 relative">
                  {item.image || item.imagem ? (
                    <img 
                      src={item.image || item.imagem} 
                      alt={item.name || item.nome || ''}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Heart className="text-gray-400 h-8 w-8" />
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow">
                  <h3 className="font-medium">{item.name || item.nome}</h3>
                  <p className="text-primary font-bold mt-1">
                    R$ {(item.price || item.preco || 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="p-4 pt-0 flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onRemoveFromWishlist(item.productId)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
