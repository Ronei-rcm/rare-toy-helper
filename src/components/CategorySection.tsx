
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CategoryItem, categories } from '@/data/categoriesData';

const CategorySection = () => {
  // Filtrar apenas categorias em destaque, como fazemos na página Categories
  const featuredCategories = categories.filter(cat => cat.featured);
  
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              Categorias
            </span>
            <h2 className="text-3xl font-bold mb-4">Explore Por Categoria</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Navegue por nossa extensa coleção de brinquedos raros e usados organizados por categoria para encontrar exatamente o que você está procurando.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map((category, index) => (
            <Link to={`/collection?category=${category.id}`} key={category.id}>
              <motion.div
                className="rounded-xl overflow-hidden h-full hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
              >
                <div className="relative h-[300px]">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10 opacity-70 mix-blend-multiply`} />
                  
                  {/* Image */}
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-medium mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/90">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
