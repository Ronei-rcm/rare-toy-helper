import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export interface ToyItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  condition: 'mint' | 'excellent' | 'good' | 'fair';
  year?: string;
  isRare?: boolean;
  description?: string;
  stock?: number;
}

interface ToyCardProps {
  toy: ToyItem;
  priority?: boolean;
}

const ToyCard = ({ toy, priority = false }: ToyCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to check if card is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const getConditionColor = (condition: string) => {
    switch(condition) {
      case 'mint': return 'bg-green-100 text-green-800';
      case 'excellent': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group glass-card rounded-xl overflow-hidden hover-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/toy/${toy.id}`}>
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
          
          {/* Image with lazy loading */}
          <img
            src={toy.image} 
            alt={toy.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoaded ? '' : 'blur-up'}`}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* "Rare" badge if applicable */}
          {toy.isRare && (
            <Badge variant="default" className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground">
              Rare
            </Badge>
          )}
          
          {/* Year badge if available */}
          {toy.year && (
            <Badge variant="outline" className="absolute top-2 right-2 z-20 bg-white/70 backdrop-blur-sm">
              {toy.year}
            </Badge>
          )}
        </Link>
        
        {/* Quick action buttons */}
        <div className="absolute right-2 bottom-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <Heart className="h-4 w-4 text-gray-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Add to wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <ShoppingCart className="h-4 w-4 text-gray-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/toy/${toy.id}`}>
                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white">
                      <Eye className="h-4 w-4 text-gray-700" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link to={`/toy/${toy.id}`} className="block">
              <h3 className="font-medium text-gray-900 line-clamp-1 hover:underline">
                {toy.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-500">{toy.category}</p>
          </div>
          
          <Badge variant="outline" className={`${getConditionColor(toy.condition)} capitalize text-xs font-normal`}>
            {toy.condition}
          </Badge>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-medium">${toy.price.toFixed(2)}</span>
            {toy.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${toy.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span className="text-xs">Add</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ToyCard;
