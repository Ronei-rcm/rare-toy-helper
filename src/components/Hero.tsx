
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Brinquedos Sustentáveis",
    subtitle: "Ótimos para o planeta e suas crianças",
    description: "Descubra nossa coleção de brinquedos eco-friendly que unem diversão e responsabilidade ambiental",
    image: "public/lovable-uploads/ef893baa-5a20-4b2d-8e1e-4ec8226bd668.png",
    link: "/about",
    color: "from-green-600/80 to-emerald-800/80"
  },
  {
    id: 2,
    title: "Colecionáveis Hot Wheels",
    subtitle: "Carrinhos em miniatura para colecionadores",
    description: "A maior coleção de Hot Wheels raros e edições limitadas do Brasil",
    image: "public/lovable-uploads/748d6bb0-e064-49e7-ad36-a6c2ae92aeb6.png",
    link: "/categories/carros",
    color: "from-red-600/80 to-orange-800/80"
  },
  {
    id: 3,
    title: "Economia Inteligente",
    subtitle: "Compre mais com menos",
    description: "Ofertas imperdíveis em brinquedos de qualidade com até 70% de desconto",
    image: "public/lovable-uploads/5c56d1fe-9643-459e-8e80-e5e23b7afb89.png",
    link: "/collection",
    color: "from-blue-600/80 to-purple-800/80"
  },
  {
    id: 4,
    title: "Star Wars Collection",
    subtitle: "Melhores colecionáveis da galáxia",
    description: "Action figures, naves e itens únicos do universo Star Wars",
    image: "public/lovable-uploads/a0458ab2-6365-4b6c-bfde-fe7108a451d5.png",
    link: "/categories/action-figures",
    color: "from-gray-900/80 to-black/80"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <section 
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] mt-16 overflow-hidden rounded-b-3xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="banner"
      aria-label="Carrossel principal de produtos"
    >
      {/* Top announcement bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-primary text-white py-2 sm:py-3 z-30 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs sm:text-sm md:text-base px-2 sm:px-4 font-medium flex items-center justify-center gap-2">
          <Play className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
          MUHL STORE - Brinquedos com histórias e emoções
        </p>
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].color} z-10`} />
          <img 
            src={slides[current].image} 
            alt={slides[current].title} 
            className="h-full w-full object-cover object-center"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slides[current].title}
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-2 sm:mb-3 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {slides[current].subtitle}
                </motion.p>
                
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-6 md:mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {slides[current].description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link to={slides[current].link}>
                    <Button 
                      size="lg" 
                      className="group bg-white text-black hover:bg-white/90 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-xl w-full sm:w-auto"
                      aria-label={`Explorar ${slides[current].title}`}
                    >
                      Explorar Coleção
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg rounded-full backdrop-blur-sm w-full sm:w-auto"
                    asChild
                  >
                    <Link to="/about">Saiba Mais</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Slide indicators */}
      <div 
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 sm:space-x-3"
        role="tablist"
        aria-label="Indicadores de slides"
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
              index === current ? 'w-8 sm:w-12 bg-white shadow-lg' : 'w-2 sm:w-3 bg-white/50 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            role="tab"
            aria-selected={index === current}
            aria-label={`Ir para slide ${index + 1}: ${slides[index].title}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-30 flex space-x-2 sm:space-x-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Floating elements for visual appeal - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-20 right-10 w-16 lg:w-20 h-16 lg:h-20 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" />
      <div className="hidden lg:block absolute top-40 right-32 w-12 h-12 bg-white/5 rounded-full backdrop-blur-sm animate-bounce" />
      <div className="hidden md:block absolute bottom-40 left-10 w-12 lg:w-16 h-12 lg:h-16 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" />
    </section>
  );
};

export default Hero;
