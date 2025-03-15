
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Collectible figures from popular series and franchises",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 24,
    featured: true
  },
  {
    id: "vintage-dolls",
    name: "Vintage Dolls",
    description: "Classic and rare dolls from different eras",
    image: "https://images.unsplash.com/photo-1603644607623-90727346ca8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 18,
    featured: true
  },
  {
    id: "model-vehicles",
    name: "Model Vehicles",
    description: "Detailed scale models of cars, planes, and more",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 35,
    featured: true
  },
  {
    id: "electronic-toys",
    name: "Electronic Toys",
    description: "Retro gaming systems and electronic playthings",
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 16,
    featured: true
  },
  {
    id: "building-toys",
    name: "Building Toys",
    description: "Construction sets, blocks, and building systems",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 22,
    featured: false
  },
  {
    id: "board-games",
    name: "Board Games",
    description: "Classic and rare board games from different decades",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 14,
    featured: false
  },
  {
    id: "plush-toys",
    name: "Plush Toys",
    description: "Collectible stuffed animals and character plushies",
    image: "https://images.unsplash.com/photo-1563901935883-cb61f5d49be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 20,
    featured: false
  },
  {
    id: "mechanical-toys",
    name: "Mechanical Toys",
    description: "Wind-up, clockwork, and mechanical playthings",
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 12,
    featured: false
  }
];

const Categories = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-4">Categories</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our collection by category to find exactly what you're looking for.
                From action figures to vintage board games, we have something for every collector.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {categories.filter(cat => cat.featured).map((category, index) => (
                <Link to={`/categories/${category.id}`} key={category.id}>
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
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center text-white/80">
                        <span className="text-sm">{category.count} items</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold mb-8">All Categories</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link to={`/categories/${category.id}`} key={category.id}>
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
                      <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <p className="text-xs text-gray-500">{category.count} items</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
