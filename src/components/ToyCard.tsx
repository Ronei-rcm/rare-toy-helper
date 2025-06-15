import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from "../components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../components/ui/tooltip";
import { Badge } from "../components/ui/badge";
import { toast } from 'react-toastify';

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Simular adição ao carrinho
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsAddingToCart(false);
    toast.success(`${toy.name} adicionado ao carrinho!`);
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToWishlist(true);
    
    // Simular adição à lista de desejos
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsAddingToWishlist(false);
    toast.success(`${toy.name} adicionado à lista de desejos!`);
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
            <Badge variant="default" className="absolute top-2 left-2 z-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              ⭐ Raro
            </Badge>
          )}
          
          {/* Year badge if available */}
          {toy.year && (
            <Badge variant="outline" className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm">
              {toy.year}
            </Badge>
          )}
        </Link>
        
        {/* Quick action buttons com melhorias */}
        <motion.div 
          className="absolute right-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ scale: 0.8, y: 10 }}
          animate={{ 
            scale: 1, 
            y: 0,
            opacity: 0
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-10 w-10 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
                      onClick={handleAddToWishlist}
                      disabled={isAddingToWishlist}
                    >
                      <Heart className={`h-4 w-4 ${isAddingToWishlist ? 'animate-pulse text-red-500' : 'text-gray-700'}`} />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Adicionar aos favoritos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-10 w-10 bg-primary text-white hover:bg-primary/90 shadow-lg"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                    >
                      <ShoppingCart className={`h-4 w-4 ${isAddingToCart ? 'animate-bounce' : ''}`} />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Adicionar ao carrinho</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/toy/${toy.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button variant="secondary" size="icon" className="h-10 w-10 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg">
                        <Eye className="h-4 w-4 text-gray-700" />
                      </Button>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Ver detalhes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
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
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">${toy.price.toFixed(2)}</span>
            {toy.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${toy.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="default" 
              size="sm" 
              className="h-9 px-4 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isAddingToCart ? 'Adicionando...' : 'Comprar'}
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToyCard;
