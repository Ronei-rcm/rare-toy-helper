
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Brinquedos Sustentáveis",
    subtitle: "Ótimos para o planeta e suas crianças",
    image: "public/lovable-uploads/ef893baa-5a20-4b2d-8e1e-4ec8226bd668.png",
    link: "/about"
  },
  {
    id: 2,
    title: "Colecionáveis Hot Wheels",
    subtitle: "Carrinhos em miniatura para colecionadores",
    image: "public/lovable-uploads/748d6bb0-e064-49e7-ad36-a6c2ae92aeb6.png",
    link: "/categories/carros"
  },
  {
    id: 3,
    title: "Economia",
    subtitle: "Compre mais com menos",
    image: "public/lovable-uploads/5c56d1fe-9643-459e-8e80-e5e23b7afb89.png",
    link: "/collection"
  },
  {
    id: 4,
    title: "Star Wars",
    subtitle: "Melhores colecionáveis",
    image: "public/lovable-uploads/a0458ab2-6365-4b6c-bfde-fe7108a451d5.png",
    link: "/categories/action-figures"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

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
      className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-0 left-0 right-0 bg-primary/50 text-white py-2 z-30 text-center">
        <p className="text-sm md:text-base px-4 font-medium">
          MUHL STORE - Brinquedos com histórias e emoções
        </p>
      </div>
      
      {slides.map((slide, index) => (
        index === current && (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="h-full w-full object-cover object-bottom"
            />
            
            <div className="absolute inset-0 z-20 flex items-end pb-12 md:items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  className="max-w-lg bg-black/40 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-200 mb-6">
                    {slide.subtitle}
                  </p>
                  <Link to={slide.link}>
                    <Button className="group">
                      Ver mais
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )
      ))}
      
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-10 right-10 z-30 flex space-x-2">
        <Button
          variant="outline" 
          size="icon" 
          onClick={prevSlide}
          className="h-10 w-10 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextSlide}
          className="h-10 w-10 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
