
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from 'lucide-react';
import { CategoryItem } from '@/data/categoriesData';

interface AllCategoriesProps {
  categories: CategoryItem[];
}

const AllCategories = ({ categories }: AllCategoriesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Todas as Categorias</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link to={`/collection?category=${category.id}`} key={category.id}>
            <motion.div
              className="group glass-card rounded-xl overflow-hidden hover-scale h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <Badge variant="outline" className="rounded-full">{category.count}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <span className="text-primary text-sm flex items-center">
                  Ver coleção <ChevronRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
