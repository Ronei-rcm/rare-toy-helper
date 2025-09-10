
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ToyCard, { ToyItem } from './ToyCard';
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toys } from '../data/toysData';

// Convert toys data to ToyItem format
const FEATURED_TOYS: ToyItem[] = toys.slice(0, 8).map(toy => ({
  id: toy.id,
  name: toy.nome,
  price: toy.preco,
  originalPrice: toy.raro ? toy.preco * 1.2 : undefined,
  image: toy.imagem,
  category: toy.categoria,
  condition: toy.condicao,
  description: toy.descricao,
  stock: toy.estoque,
  isRare: toy.raro
}));

const categories = [
  "All",
  "Action Figures",
  "Bichinhos de Pelúcia",
  "Jogos de Tabuleiro",
  "Videogames Retrô",
  "Personagens Nintendo",
  "Bonecas Vintage",
  "Carrinhos Vintage"
];

const FeaturedToys = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredToys, setFilteredToys] = useState<ToyItem[]>(FEATURED_TOYS);
  
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredToys(FEATURED_TOYS);
    } else {
      setFilteredToys(FEATURED_TOYS.filter(toy => toy.category === activeCategory));
    }
  }, [activeCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Coleção em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra nossa seleção cuidadosamente curada de brinquedos raros e colecionáveis que trazem de volta a alegria e nostalgia de anos passados.
            </p>
          </motion.div>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="bg-white/50 backdrop-blur-sm flex-wrap">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2 whitespace-nowrap"
                >
                  {category === "All" ? "Todos" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredToys.map((toy, index) => (
                  <ToyCard 
                    key={toy.id} 
                    toy={toy} 
                    priority={index < 4} 
                  />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/products">Ver Catálogo Completo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToys;
