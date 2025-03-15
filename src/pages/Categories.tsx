
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Award, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Figuras colecionáveis de séries e franquias populares",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 24,
    featured: true
  },
  {
    id: "vintage-dolls",
    name: "Bonecas Vintage",
    description: "Bonecas clássicas e raras de diferentes épocas",
    image: "https://images.unsplash.com/photo-1603644607623-90727346ca8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 18,
    featured: true
  },
  {
    id: "model-vehicles",
    name: "Modelos de Veículos",
    description: "Modelos detalhados em escala de carros, aviões e mais",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 35,
    featured: true
  },
  {
    id: "electronic-toys",
    name: "Brinquedos Eletrônicos",
    description: "Jogos eletrônicos retrô e aparelhos de diversão vintage",
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 16,
    featured: true
  },
  {
    id: "building-toys",
    name: "Brinquedos de Construção",
    description: "Conjuntos de construção, blocos e sistemas de montagem",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 22,
    featured: false
  },
  {
    id: "board-games",
    name: "Jogos de Tabuleiro",
    description: "Jogos de tabuleiro clássicos e raros de diferentes décadas",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 14,
    featured: false
  },
  {
    id: "plush-toys",
    name: "Bichinhos de Pelúcia",
    description: "Animais de pelúcia colecionáveis e personagens históricos",
    image: "https://images.unsplash.com/photo-1563901935883-cb61f5d49be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 20,
    featured: false
  },
  {
    id: "mechanical-toys",
    name: "Brinquedos Mecânicos",
    description: "Brinquedos de corda, relógio e mecânicos vintage",
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 12,
    featured: false
  }
];

// Lista de produtos populares por categoria
const popularProducts = [
  {
    id: "p1",
    name: "Optimus Prime G1",
    category: "action-figures",
    price: 1299.90,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p2",
    name: "Barbie Coleção 1975",
    category: "vintage-dolls",
    price: 799.90,
    image: "https://images.unsplash.com/photo-1613682988402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p3",
    name: "Ferrari F40 Escala 1:18",
    category: "model-vehicles",
    price: 549.90,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p4",
    name: "Game Boy Original",
    category: "electronic-toys",
    price: 899.90,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p5",
    name: "LEGO Space Set 1986",
    category: "building-toys",
    price: 1249.90,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p6",
    name: "Monopólio Vintage",
    category: "board-games",
    price: 399.90,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  
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
              <h1 className="text-3xl font-bold mb-4">Categorias</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Navegue por nossa coleção por categoria para encontrar exatamente o que você está procurando.
                De action figures a jogos de tabuleiro vintage, temos algo para cada colecionador.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Categorias em Destaque</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {categories.filter(cat => cat.featured).map((category, index) => (
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
            
            {/* Produtos populares por categoria */}
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
                  {categories.filter(cat => cat.featured).map(category => (
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
                {popularProducts
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
