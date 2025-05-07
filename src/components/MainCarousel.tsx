
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
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
}

// Slides padrão para demonstração
const defaultSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Brinquedos Exclusivos',
    description: 'Encontre itens raros para sua coleção',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/collection',
  },
  {
    id: '2',
    title: 'Nostalgia Garantida',
    description: 'Reviva memórias com brinquedos vintage',
    imageUrl: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/collection/vintage',
  },
  {
    id: '3',
    title: 'Colecionáveis Nintendo',
    description: 'Os personagens que marcaram gerações',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/categories/nintendo',
  },
];

const MainCarousel = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>(defaultSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Simular carregamento de slides do backend
  useEffect(() => {
    // Aqui seria implementada a chamada à API para buscar os slides
    console.log('Carregando slides do carrossel');
    
    // Por enquanto, estamos usando os slides padrão
    // setSlides(defaultSlides);
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
    <section className="w-full">
      <Carousel 
        className="w-full"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full">
                <div className="aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden rounded-lg">
                  <img 
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center p-6 md:p-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 max-w-md">
                      {slide.title}
                    </h2>
                    {slide.description && (
                      <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6 max-w-md">
                        {slide.description}
                      </p>
                    )}
                    {slide.link && (
                      <div>
                        <Button 
                          asChild 
                          size="lg" 
                          className="bg-white text-black hover:bg-white/90"
                        >
                          <Link to={slide.link}>
                            Explorar <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSlide(index);
                setAutoPlay(false);
              }}
              className={`h-2 rounded-full transition-all ${
                activeSlide === index 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default MainCarousel;
