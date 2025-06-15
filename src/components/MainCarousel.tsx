
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface CarouselSlide {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
  badge?: string;
}

// Slides padrão para demonstração
const defaultSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Brinquedos Exclusivos',
    description: 'Encontre itens raros e únicos para sua coleção especial',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/collection',
    badge: 'Novidade'
  },
  {
    id: '2',
    title: 'Nostalgia Garantida',
    description: 'Reviva memórias da infância com brinquedos vintage autênticos',
    imageUrl: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/collection/vintage',
    badge: 'Vintage'
  },
  {
    id: '3',
    title: 'Colecionáveis Nintendo',
    description: 'Os personagens que marcaram gerações em action figures únicos',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/categories/nintendo',
    badge: 'Popular'
  },
];

const MainCarousel = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>(defaultSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Simular carregamento de slides do backend
  useEffect(() => {
    console.log('Carregando slides do carrossel');
  }, []);

  // Autoplay para o carrossel
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  return (
    <section 
      className="w-full relative"
      role="region"
      aria-label="Destaques da semana"
    >
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" aria-hidden="true" />
        <span className="text-xs sm:text-sm font-medium text-gray-700">Destaques da Semana</span>
      </div>

      <Carousel 
        className="w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <motion.div 
                className="relative w-full group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden">
                  <motion.img 
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  
                  {slide.badge && (
                    <motion.div 
                      className="absolute top-3 sm:top-6 right-3 sm:right-6 z-10"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="bg-primary text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                        {slide.badge}
                      </span>
                    </motion.div>
                  )}
                  
                  <div className="absolute inset-0 flex flex-col justify-center p-3 sm:p-6 md:p-12">
                    <motion.div
                      className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.h2 
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {slide.title}
                      </motion.h2>
                      
                      {slide.description && (
                        <motion.p 
                          className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-6 leading-relaxed max-w-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          {slide.description}
                        </motion.p>
                      )}
                      
                      {slide.link && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <Button 
                            asChild 
                            size="lg" 
                            className="bg-white text-black hover:bg-white/90 group px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                          >
                            <Link to={slide.link}>
                              Explorar Agora
                              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom indicators */}
        <div 
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
          role="tablist"
          aria-label="Navegação do carrossel"
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveSlide(index);
                setAutoPlay(false);
              }}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                activeSlide === index 
                  ? 'w-8 sm:w-12 bg-white shadow-lg' 
                  : 'w-2 sm:w-3 bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Custom navigation - visible on larger screens */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:block"
        >
          <CarouselPrevious className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-white" />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:block"
        >
          <CarouselNext className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-white" />
        </motion.div>
      </Carousel>
      
      {/* Decorative elements - hidden on small screens */}
      <div className="absolute -top-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary/20 rounded-full animate-pulse hidden sm:block" />
      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary/30 rounded-full animate-bounce hidden sm:block" />
      <div className="absolute -bottom-2 left-6 sm:left-10 w-4 h-4 sm:w-5 sm:h-5 bg-primary/10 rounded-full animate-pulse hidden sm:block" />
    </section>
  );
};

export default MainCarousel;
