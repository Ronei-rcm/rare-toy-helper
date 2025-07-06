import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CarouselSlide } from '../types/carousel';

interface CarouselContextType {
  slides: CarouselSlide[];
  addSlide: (slide: Omit<CarouselSlide, 'id'>) => void;
  removeSlide: (id: string) => void;
  toggleSlideStatus: (id: string) => void;
  getActiveSlides: () => CarouselSlide[];
  loading: boolean;
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

// Slides iniciais
const initialSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Brinquedos Exclusivos',
    description: 'Encontre itens raros e únicos para sua coleção especial',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/collection',
    badge: 'Novidade',
    active: true
  },
  {
    id: '2',
    title: 'Nostalgia Garantida',
    description: 'Reviva memórias da infância com brinquedos vintage autênticos',
    imageUrl: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/collection/vintage',
    badge: 'Vintage',
    active: true
  },
  {
    id: '3',
    title: 'Colecionáveis Nintendo',
    description: 'Os personagens que marcaram gerações em action figures únicos',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    link: '/categories/nintendo',
    badge: 'Popular',
    active: true
  }
];

export const CarouselProvider = ({ children }: { children: ReactNode }) => {
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides);
  const [loading, setLoading] = useState(false);

  const addSlide = (newSlideData: Omit<CarouselSlide, 'id'>) => {
    const slide: CarouselSlide = {
      ...newSlideData,
      id: Date.now().toString()
    };
    setSlides(prev => [...prev, slide]);
  };

  const removeSlide = (id: string) => {
    setSlides(prev => prev.filter(slide => slide.id !== id));
  };

  const toggleSlideStatus = (id: string) => {
    setSlides(prev => 
      prev.map(slide => 
        slide.id === id ? { ...slide, active: !slide.active } : slide
      )
    );
  };

  const getActiveSlides = () => {
    return slides.filter(slide => slide.active);
  };

  return (
    <CarouselContext.Provider value={{
      slides,
      addSlide,
      removeSlide,
      toggleSlideStatus,
      getActiveSlides,
      loading
    }}>
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (context === undefined) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
};