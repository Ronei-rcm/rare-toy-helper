
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Rare & Collectible Toys",
    subtitle: "Discover unique pieces from the past",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/collection"
  },
  {
    id: 2,
    title: "Vintage Action Figures",
    subtitle: "Relive the golden age of toys",
    cta: "View Figures",
    image: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
    link: "/categories/action-figures"
  },
  {
    id: 3,
    title: "Childhood Memories",
    subtitle: "Find the toys you grew up with",
    cta: "Discover More",
    image: "https://images.unsplash.com/photo-1560859251-abf769462b45?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/categories/vintage"
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
                    className="max-w-lg"
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
    </section>
  );
};

export default Hero;
