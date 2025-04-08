
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ToyCard, { ToyItem } from './ToyCard';
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Sample data - would be fetched from API in a real application
const SAMPLE_TOYS: ToyItem[] = [
  {
    id: "1",
    name: "Vintage Transformer Action Figure",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Action Figures",
    condition: "excellent",
    year: "1985",
    isRare: true
  },
  {
    id: "2",
    name: "Classic Star Wars X-Wing Fighter",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Vehicles",
    condition: "good",
    year: "1978"
  },
  {
    id: "3",
    name: "Collectible Barbie Doll Limited Edition",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1613682988402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dolls",
    condition: "mint",
    year: "1992",
    isRare: true
  },
  {
    id: "4",
    name: "Retro Nintendo Game Boy",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Electronic Toys",
    condition: "fair",
    year: "1989"
  },
  {
    id: "5",
    name: "Vintage Tin Robot",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Mechanical Toys",
    condition: "good",
    year: "1960",
    isRare: true
  },
  {
    id: "6",
    name: "LEGO Space Set Complete",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Building Toys",
    condition: "excellent",
    year: "1995"
  },
  {
    id: "7",
    name: "Miniature Dollhouse Set",
    price: 199.99,
    originalPrice: 250.00,
    image: "https://images.unsplash.com/photo-1617096199249-88fa7859a80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dollhouses",
    condition: "excellent",
    year: "1980"
  },
  {
    id: "8",
    name: "Vintage Board Game Collection",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Board Games",
    condition: "good",
    year: "1970"
  }
];

const categories = [
  "All",
  "Action Figures",
  "Vehicles",
  "Dolls",
  "Electronic Toys",
  "Building Toys"
];

const FeaturedToys = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredToys, setFilteredToys] = useState<ToyItem[]>(SAMPLE_TOYS);
  
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredToys(SAMPLE_TOYS);
    } else {
      setFilteredToys(SAMPLE_TOYS.filter(toy => toy.category === activeCategory));
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
            <h2 className="text-3xl font-bold mb-4">Featured Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of rare and collectible toys that bring back the joy and nostalgia of years past.
            </p>
          </motion.div>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/50 backdrop-blur-sm">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2"
                >
                  {category}
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
            <Link to="/collection">View Full Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToys;
