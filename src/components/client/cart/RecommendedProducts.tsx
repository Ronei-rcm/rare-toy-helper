
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Plus, Star, Heart } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

const recommendedProducts: Product[] = [
  {
    id: "rec1",
    name: "Action Figure Transformers",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "rec2",
    name: "LEGO Creator Expert",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89
  },
  {
    id: "rec3",
    name: "Boneca Vintage Collector",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1613682988402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 67
  }
];

const RecommendedProducts = () => {
  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleAddToWishlist = (product: Product) => {
    toast.success(`${product.name} adicionado à lista de desejos!`);
  };

  return (
    <motion.div 
      className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Produtos que você pode gostar
        </h3>
        <p className="text-gray-600">
          Baseado nos itens do seu carrinho, selecionamos essas recomendações especiais
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
                
                <motion.button
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToWishlist(product)}
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>
              
              <div className="p-4 space-y-3">
                <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                  {product.name}
                </h4>
                
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full h-8 text-sm gap-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecommendedProducts;
