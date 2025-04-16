
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const characterSlides = [
  {
    id: 1,
    name: "Mario",
    description: "O encanador mais famoso dos videogames",
    color: "from-red-500 to-red-700",
    textColor: "text-yellow-200"
  },
  {
    id: 2,
    name: "Luigi",
    description: "O irmão mais alto e corajoso quando precisa ser",
    color: "from-green-500 to-green-700",
    textColor: "text-white"
  },
  {
    id: 3,
    name: "Princesa Peach",
    description: "A governante do Reino dos Cogumelos",
    color: "from-pink-400 to-pink-600",
    textColor: "text-white"
  }
];

const NintendoCharactersBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const character = characterSlides[activeIndex];
  
  return (
    <section className="py-12 px-4 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Personagens <span className="text-primary">Nintendo</span> Favoritos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {characterSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${
                index === activeIndex ? 'ring-4 ring-primary ring-offset-2' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-90`}></div>
              <div className="relative p-6 md:p-8 flex flex-col h-full min-h-[280px]">
                <div className="flex-1">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${slide.textColor}`}>{slide.name}</h3>
                  <p className="text-white text-opacity-90 mb-4">{slide.description}</p>
                </div>
                <div className="flex justify-center items-center w-full">
                  <img 
                    src={`/nintendo/${slide.name.toLowerCase().replace(' ', '-')}.png`}
                    alt={slide.name}
                    className="h-32 md:h-40 object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/categories/nintendo">
            <Button size="lg" className="px-8 py-6 text-lg">
              Ver todos os brinquedos Nintendo <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 bg-secondary/20 p-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Coleção Completa de Personagens</h3>
              <p className="text-gray-700 mb-6">
                Nossa loja possui uma das maiores coleções de brinquedos, action figures e itens colecionáveis dos personagens mais queridos da Nintendo. De Mario a Zelda, temos tudo que você precisa para completar sua coleção.
              </p>
              <Link to="/collection">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Explorar Coleção Completa
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square rounded-md bg-blue-100 flex items-center justify-center">
                  <img 
                    src="/nintendo/yoshi.png" 
                    alt="Yoshi" 
                    className="h-24 md:h-32 object-contain"
                  />
                </div>
                <h4 className="font-medium mt-3 text-center">Yoshi</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square rounded-md bg-yellow-100 flex items-center justify-center">
                  <img 
                    src="/nintendo/toad.png" 
                    alt="Toad" 
                    className="h-24 md:h-32 object-contain"
                  />
                </div>
                <h4 className="font-medium mt-3 text-center">Toad</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square rounded-md bg-green-100 flex items-center justify-center">
                  <img 
                    src="/nintendo/bowser.png" 
                    alt="Bowser" 
                    className="h-24 md:h-32 object-contain"
                  />
                </div>
                <h4 className="font-medium mt-3 text-center">Bowser</h4>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square rounded-md bg-purple-100 flex items-center justify-center">
                  <img 
                    src="/nintendo/wario.png" 
                    alt="Wario" 
                    className="h-24 md:h-32 object-contain"
                  />
                </div>
                <h4 className="font-medium mt-3 text-center">Wario</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NintendoCharactersBanner;
