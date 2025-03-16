
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react';
import { ProductItem } from '@/data/popularProductsData';
import { CategoryItem } from '@/data/categoriesData';

interface PopularProductsProps {
  products: ProductItem[];
  categories: CategoryItem[];
}

const PopularProducts = ({ products, categories }: PopularProductsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const featuredCategories = categories.filter(cat => cat.featured);
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Produtos Populares</h2>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedCategory === "" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("")}
          >
            Todos
          </Badge>
          {featuredCategories.map(category => (
            <Badge 
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter(product => selectedCategory === "" || product.category === selectedCategory)
          .map((product, index) => (
            <motion.div
              key={product.id}
              className="group glass-card rounded-xl overflow-hidden hover-scale h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex gap-1">
                  <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-white" /> 4.8
                  </span>
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Novo
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <p className="text-primary font-bold">R$ {product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default PopularProducts;
