
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Action Figures",
    description: "Collectible figures from popular series and franchises",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 2,
    name: "Vintage Dolls",
    description: "Classic and rare dolls from different eras",
    image: "https://images.unsplash.com/photo-1603644607623-90727346ca8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 3,
    name: "Model Vehicles",
    description: "Detailed scale models of cars, planes, and more",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "from-amber-500/20 to-red-500/20"
  },
  {
    id: 4,
    name: "Electronic Toys",
    description: "Retro gaming systems and electronic playthings",
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "from-teal-500/20 to-emerald-500/20"
  }
];

const CategorySection = () => {
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
              Categories
            </span>
            <h2 className="text-3xl font-bold mb-4">Explore By Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our extensive collection of rare and used toys organized by category to find exactly what you're looking for.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={category.id}>
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
                  <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-70 mix-blend-multiply`} />
                  
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
