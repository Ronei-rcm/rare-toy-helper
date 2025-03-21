
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Sustentabilidade na Prática",
    subtitle: "Ao optar por brinquedos semi-novos, você contribui para um mundo sustentável",
    cta: "Saiba Mais",
    image: "public/lovable-uploads/ef893baa-5a20-4b2d-8e1e-4ec8226bd668.png",
    link: "/about"
  },
  {
    id: 2,
    title: "Os Melhores Carros Hot Wheels",
    subtitle: "Carrinhos em miniatura que encantam colecionadores de todas as idades",
    cta: "Ver Coleção",
    image: "public/lovable-uploads/748d6bb0-e064-49e7-ad36-a6c2ae92aeb6.png",
    link: "/categories/carros"
  },
  {
    id: 3,
    title: "Economia Financeira e Sustentabilidade",
    subtitle: "Com valor de 1 brinquedo você pode comprar até 5",
    cta: "Confira Ofertas",
    image: "public/lovable-uploads/5c56d1fe-9643-459e-8e80-e5e23b7afb89.png",
    link: "/collection"
  },
  {
    id: 4,
    title: "Star Wars e Colecionáveis",
    subtitle: "Os melhores vilões e heróis para sua coleção",
    cta: "Ver Colecionáveis",
    image: "public/lovable-uploads/a0458ab2-6365-4b6c-bfde-fe7108a451d5.png",
    link: "/categories/action-figures"
  },
  {
    id: 5,
    title: "Bonecas Barbie e Acessórios",
    subtitle: "Encontre modelos novos e usados em perfeito estado",
    cta: "Explore",
    image: "public/lovable-uploads/9bc480a9-9694-470f-b6b8-ebc9de483263.png",
    link: "/categories/bonecas"
  },
  {
    id: 6,
    title: "Personagens Preferidos",
    subtitle: "Brinquedos que trazem alegria e memórias especiais",
    cta: "Descubra Mais",
    image: "public/lovable-uploads/3785c4b3-c195-40d2-a97e-737af231796d.png",
    link: "/collection"
  },
  {
    id: 7,
    title: "Economia Financeira",
    subtitle: "Sustentabilidade x Rotatividade: brinquedos acessíveis para todos",
    cta: "Ver Ofertas",
    image: "public/lovable-uploads/fc275b37-7bea-40e1-93fc-62f61d26cb4b.png",
    link: "/categories/ofertas"
  },
  {
    id: 8,
    title: "Brinquedos Semi-Novos",
    subtitle: "Você contribui para um mundo sustentável",
    cta: "Conheça Nossa Missão",
    image: "public/lovable-uploads/fb4de360-61f0-4564-b9cc-fd0db856daca.png",
    link: "/about"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance slides, pause on hover
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 5000);
    
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
      className="relative h-[85vh] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slogan Banner */}
      <div className="absolute top-0 left-0 right-0 bg-primary/80 text-white py-2 z-30 text-center backdrop-blur-sm">
        <p className="text-sm md:text-base px-4 font-medium">
          Bem-vindos à MUHL STORE - Onde brinquedos carregam histórias e emoções
        </p>
      </div>
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === current && (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Image with overlay */}
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    className="max-w-lg mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                      {slide.subtitle}
                    </p>
                    <Link to={slide.link}>
                      <Button className="group" size="lg">
                        {slide.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-8 z-30 flex space-x-2">
        <Button
          variant="outline" 
          size="icon" 
          onClick={prevSlide}
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextSlide}
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Extended slogan */}
      <div className="absolute bottom-20 left-0 right-0 z-20 text-white bg-black/40 backdrop-blur-sm py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            Vendas de brinquedos novos e semi-novos. Conceito de economia financeira e de recursos naturais, 
            sustentabilidade e rotatividade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
