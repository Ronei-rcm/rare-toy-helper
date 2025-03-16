
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from 'lucide-react';
import { CategoryItem } from '@/data/categoriesData';

interface FeaturedCategoriesProps {
  categories: CategoryItem[];
}

const FeaturedCategories = ({ categories }: FeaturedCategoriesProps) => {
  const featuredCategories = categories.filter(cat => cat.featured);
  
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8">Categorias em Destaque</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredCategories.map((category, index) => (
          <Link to={`/collection?category=${category.id}`} key={category.id}>
            <motion.div
              className="group relative h-72 rounded-xl overflow-hidden hover-scale shine-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Image with overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <Badge className="w-fit mb-2 bg-primary/80">{category.count} itens</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/90 mb-3">
                  {category.description}
                </p>
                <span className="text-white/80 flex items-center text-sm">
                  Ver produtos <ChevronRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
