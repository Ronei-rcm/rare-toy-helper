
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
    <section className="w-full relative">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-gray-700">Destaques da Semana</span>
      </div>

      <Carousel 
        className="w-full overflow-hidden rounded-2xl shadow-2xl"
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
                <div className="aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden">
                  <motion.img 
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  
                  {slide.badge && (
                    <motion.div 
                      className="absolute top-6 right-6 z-10"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {slide.badge}
                      </span>
                    </motion.div>
                  )}
                  
                  <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
                    <motion.div
                      className="max-w-2xl"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.h2 
                        className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {slide.title}
                      </motion.h2>
                      
                      {slide.description && (
                        <motion.p 
                          className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed max-w-xl"
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
                            className="bg-white text-black hover:bg-white/90 group px-8 py-3 rounded-full font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                          >
                            <Link to={slide.link}>
                              Explorar Agora
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveSlide(index);
                setAutoPlay(false);
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeSlide === index 
                  ? 'w-12 bg-white shadow-lg' 
                  : 'w-3 bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Custom navigation */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20"
        >
          <CarouselPrevious className="h-12 w-12 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg" />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20"
        >
          <CarouselNext className="h-12 w-12 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg" />
        </motion.div>
      </Carousel>
      
      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/30 rounded-full animate-bounce" />
      <div className="absolute -bottom-2 left-10 w-5 h-5 bg-primary/10 rounded-full animate-pulse" />
    </section>
  );
};

export default MainCarousel;
