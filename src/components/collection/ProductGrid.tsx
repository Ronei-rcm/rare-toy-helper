
import { motion } from 'framer-motion';
import ToyCard, { ToyItem } from '@/components/ToyCard';
import { SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: ToyItem[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <SlidersHorizontal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">Nenhum produto encontrado</h3>
        <p className="text-gray-600">Tente ajustar seus filtros para encontrar o que está procurando.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <ToyCard
            toy={product}
            priority={index < 4}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
