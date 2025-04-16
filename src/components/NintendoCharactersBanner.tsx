import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const characterSlides = [
  {
    id: 1,
    name: "Mario",
    description: "O encanador mais famoso dos videogames",
    color: "from-red-600 to-red-800",
    textColor: "text-yellow-200",
    buttonColor: "bg-red-600 hover:bg-red-700"
  },
  {
    id: 2,
    name: "Luigi",
    description: "O irmão mais alto e corajoso quando precisa ser",
    color: "from-green-600 to-green-800",
    textColor: "text-white",
    buttonColor: "bg-green-600 hover:bg-green-700"
  },
  {
    id: 3,
    name: "Princesa Peach",
    description: "A governante do Reino dos Cogumelos",
    color: "from-pink-500 to-pink-700",
    textColor: "text-white",
    buttonColor: "bg-pink-500 hover:bg-pink-600"
  }
];

const NintendoCharactersBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Auto-rotate characters
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % characterSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay]);
  
  const nextCharacter = () => {
    setActiveIndex((current) => (current + 1) % characterSlides.length);
  };

  const prevCharacter = () => {
    setActiveIndex((current) => (current - 1 + characterSlides.length) % characterSlides.length);
  };
  
  // Current character
  const character = characterSlides[activeIndex];
  
  return (
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 bg-[url('/patterns/nintendo-pattern.png')] opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Personagens <span className="text-primary">Nintendo</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore nossa coleção de brinquedos e action figures dos personagens mais icônicos dos jogos Nintendo
        </p>
        
        {/* Main Character Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div 
            className={`p-8 rounded-2xl shadow-xl overflow-hidden relative min-h-[360px] flex flex-col justify-between`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${character.color} -z-10`}></div>
            <div className="absolute inset-0 bg-[url('/patterns/mario-pattern.png')] bg-repeat opacity-10"></div>
            
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={`text-4xl md:text-5xl font-bold mb-2 ${character.textColor}`}>
                    {character.name}
                  </h3>
                  <p className="text-white text-opacity-90 text-lg md:text-xl mb-4 max-w-md">
                    {character.description}
                  </p>
                  
                  <div className="pt-4">
                    <Link to={`/products/character/${character.name.toLowerCase()}`}>
                      <Button 
                        size="lg" 
                        className={`${character.buttonColor} text-white border-none shadow-lg`}
                      >
                        Ver coleção <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <div className="flex gap-2">
                {characterSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setAutoPlay(false);
                    }}
                    className={`h-3 rounded-full transition-all ${
                      idx === activeIndex 
                        ? 'w-8 bg-white' 
                        : 'w-3 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ver ${slide.name}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    prevCharacter();
                    setAutoPlay(false);
                  }}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/40 h-10 w-10 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    nextCharacter();
                    setAutoPlay(false);
                  }}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/40 h-10 w-10 rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={character.id}
                className="relative h-80 md:h-96 w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={`/nintendo/${character.name.toLowerCase()}.png`}
                  alt={character.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full object-contain drop-shadow-2xl"
                  initial={{ y: 10 }}
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black/10 blur-xl rounded-full"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Other Characters Carousel */}
        <div className="mt-12 px-4">
          <h3 className="text-2xl font-bold mb-6 text-center">Mais personagens da Nintendo</h3>
          
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {["Yoshi", "Bowser", "Toad", "Wario", "Donkey Kong", "Link"].map((character) => (
                <CarouselItem key={character} className="md:basis-1/4 lg:basis-1/5">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-4">
                      <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-3 overflow-hidden">
                        <img
                          src={`/nintendo/${character.toLowerCase().replace(' ', '-')}.png`}
                          alt={character}
                          className="h-24 object-contain"
                        />
                      </div>
                      <h4 className="font-medium text-center">{character}</h4>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/categories/nintendo">
            <Button size="lg" className="px-8 py-6 text-lg">
              Ver todos os brinquedos Nintendo <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NintendoCharactersBanner;
