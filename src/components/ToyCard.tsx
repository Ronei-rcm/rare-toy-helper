
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
import { toast } from 'sonner';

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
      className="group glass-card rounded-xl overflow-hidden hover-scale w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="article"
      aria-labelledby={`toy-title-${toy.id}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <Link 
          to={`/toy/${toy.id}`}
          aria-label={`Ver detalhes de ${toy.name}`}
          className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
          
          {/* Image with lazy loading */}
          <img
            src={toy.image} 
            alt={`${toy.name} - ${toy.condition} condition, ${toy.category}`}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoaded ? '' : 'blur-up'}`}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* "Rare" badge if applicable */}
          {toy.isRare && (
            <Badge 
              variant="default" 
              className="absolute top-2 left-2 z-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs"
              aria-label="Item raro"
            >
              ⭐ Raro
            </Badge>
          )}
          
          {/* Year badge if available */}
          {toy.year && (
            <Badge 
              variant="outline" 
              className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm text-xs"
              aria-label={`Ano: ${toy.year}`}
            >
              {toy.year}
            </Badge>
          )}
        </Link>
        
        {/* Quick action buttons - visible on hover/focus */}
        <motion.div 
          className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 z-20 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-300"
          initial={{ scale: 0.8, y: 10 }}
          animate={{ 
            scale: 1, 
            y: 0,
            opacity: 0
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col gap-1 sm:gap-2">
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
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg focus:ring-2 focus:ring-primary"
                      onClick={handleAddToWishlist}
                      disabled={isAddingToWishlist}
                      aria-label={`Adicionar ${toy.name} aos favoritos`}
                    >
                      <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isAddingToWishlist ? 'animate-pulse text-red-500' : 'text-gray-700'}`} />
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
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-primary text-white hover:bg-primary/90 shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      aria-label={`Adicionar ${toy.name} ao carrinho`}
                    >
                      <ShoppingCart className={`h-3 w-3 sm:h-4 sm:w-4 ${isAddingToCart ? 'animate-bounce' : ''}`} />
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
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 sm:h-10 sm:w-10 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg focus:ring-2 focus:ring-primary"
                        aria-label={`Ver detalhes de ${toy.name}`}
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
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
      
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="space-y-1 flex-1 min-w-0">
            <Link 
              to={`/toy/${toy.id}`} 
              className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              <h3 
                id={`toy-title-${toy.id}`}
                className="font-medium text-sm sm:text-base text-gray-900 line-clamp-2 hover:underline truncate"
              >
                {toy.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 truncate">{toy.category}</p>
          </div>
          
          <Badge 
            variant="outline" 
            className={`${getConditionColor(toy.condition)} capitalize text-xs font-normal ml-2 shrink-0`}
            aria-label={`Condição: ${toy.condition}`}
          >
            {toy.condition}
          </Badge>
        </div>
        
        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1 sm:gap-2 min-w-0">
            <span 
              className="text-lg sm:text-xl font-bold text-primary truncate"
              aria-label={`Preço: ${toy.price.toFixed(2)} reais`}
            >
              R$ {toy.price.toFixed(2)}
            </span>
            {toy.originalPrice && (
              <span 
                className="text-xs sm:text-sm text-gray-500 line-through truncate"
                aria-label={`Preço original: ${toy.originalPrice.toFixed(2)} reais`}
              >
                R$ {toy.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0"
          >
            <Button 
              variant="default" 
              size="sm" 
              className="h-8 sm:h-9 px-2 sm:px-4 gap-1 sm:gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              aria-label={`Comprar ${toy.name}`}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium hidden sm:inline">
                {isAddingToCart ? 'Adicionando...' : 'Comprar'}
              </span>
              <span className="font-medium sm:hidden">
                {isAddingToCart ? '...' : 'Comprar'}
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToyCard;
