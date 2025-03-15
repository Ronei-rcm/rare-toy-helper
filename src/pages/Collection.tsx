
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ToyCard, { ToyItem } from '@/components/ToyCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data - would be fetched from API in a real application
const SAMPLE_TOYS: ToyItem[] = [
  {
    id: "1",
    name: "Vintage Transformer Action Figure",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Action Figures",
    condition: "excellent",
    year: "1985",
    isRare: true
  },
  {
    id: "2",
    name: "Classic Star Wars X-Wing Fighter",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Vehicles",
    condition: "good",
    year: "1978"
  },
  {
    id: "3",
    name: "Collectible Barbie Doll Limited Edition",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1613682988402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dolls",
    condition: "mint",
    year: "1992",
    isRare: true
  },
  {
    id: "4",
    name: "Retro Nintendo Game Boy",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Electronic Toys",
    condition: "fair",
    year: "1989"
  },
  {
    id: "5",
    name: "Vintage Tin Robot",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Mechanical Toys",
    condition: "good",
    year: "1960",
    isRare: true
  },
  {
    id: "6",
    name: "LEGO Space Set Complete",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Building Toys",
    condition: "excellent",
    year: "1995"
  },
  {
    id: "7",
    name: "Miniature Dollhouse Set",
    price: 199.99,
    originalPrice: 250.00,
    image: "https://images.unsplash.com/photo-1617096199249-88fa7859a80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dollhouses",
    condition: "excellent",
    year: "1980"
  },
  {
    id: "8",
    name: "Vintage Board Game Collection",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Board Games",
    condition: "good",
    year: "1970"
  },
  {
    id: "9",
    name: "Classic Wooden Rocking Horse",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1589931326504-881ec5a3ba76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Traditional Toys",
    condition: "good",
    year: "1950",
    isRare: true
  },
  {
    id: "10",
    name: "Antique Porcelain Doll Collection",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1603644607623-90727346ca8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dolls",
    condition: "excellent",
    year: "1920",
    isRare: true
  },
  {
    id: "11",
    name: "Vintage Model Train Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1596461042099-8cef551354be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Vehicles",
    condition: "good",
    year: "1965"
  },
  {
    id: "12",
    name: "Retro Arcade Machine Mini",
    price: 279.99,
    originalPrice: 329.99,
    image: "https://images.unsplash.com/photo-1533420896084-06d2bce5365f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Electronic Toys",
    condition: "mint",
    year: "1990"
  }
];

const Collection = () => {
  const isMobile = useIsMobile();
  const [toys, setToys] = useState<ToyItem[]>(SAMPLE_TOYS);
  const [filteredToys, setFilteredToys] = useState<ToyItem[]>(SAMPLE_TOYS);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showRareOnly, setShowRareOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  const categories = [...new Set(SAMPLE_TOYS.map(toy => toy.category))];
  const conditions = ['mint', 'excellent', 'good', 'fair'];
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...toys];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(toy => 
        toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toy.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Price range filter
    result = result.filter(toy => 
      toy.price >= priceRange[0] && toy.price <= priceRange[1]
    );
    
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(toy => selectedCategories.includes(toy.category));
    }
    
    // Condition filter
    if (selectedConditions.length > 0) {
      result = result.filter(toy => selectedConditions.includes(toy.condition));
    }
    
    // Rare only filter
    if (showRareOnly) {
      result = result.filter(toy => toy.isRare);
    }
    
    // Sorting
    switch (sortBy) {
      case 'price-low-to-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          if (!a.year || !b.year) return 0;
          return parseInt(b.year) - parseInt(a.year);
        });
        break;
      case 'oldest':
        result.sort((a, b) => {
          if (!a.year || !b.year) return 0;
          return parseInt(a.year) - parseInt(b.year);
        });
        break;
      // 'featured' is default and uses the original order
    }
    
    setFilteredToys(result);
  }, [toys, searchQuery, priceRange, selectedCategories, selectedConditions, showRareOnly, sortBy]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setShowRareOnly(false);
    setSortBy('featured');
  };
  
  // Filter component for desktop
  const FiltersDesktop = () => (
    <div className="space-y-8 w-64 flex-shrink-0">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 500]}
            value={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories(prev => [...prev, category]);
                  } else {
                    setSelectedCategories(prev => prev.filter(c => c !== category));
                  }
                }}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Condition</h3>
        <div className="space-y-2">
          {conditions.map(condition => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedConditions(prev => [...prev, condition]);
                  } else {
                    setSelectedConditions(prev => prev.filter(c => c !== condition));
                  }
                }}
              />
              <Label
                htmlFor={`condition-${condition}`}
                className="text-sm font-normal capitalize cursor-pointer"
              >
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rare-only"
          checked={showRareOnly}
          onCheckedChange={(checked) => setShowRareOnly(!!checked)}
        />
        <Label
          htmlFor="rare-only"
          className="text-sm font-normal cursor-pointer"
        >
          Show rare items only
        </Label>
      </div>
      
      <Button
        variant="outline"
        onClick={resetFilters}
        size="sm"
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
  
  // Filter component for mobile (inside sheet)
  const FiltersMobile = () => (
    <div className="space-y-8 py-4">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 500]}
            value={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`mobile-category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories(prev => [...prev, category]);
                  } else {
                    setSelectedCategories(prev => prev.filter(c => c !== category));
                  }
                }}
              />
              <Label
                htmlFor={`mobile-category-${category}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Condition</h3>
        <div className="space-y-2">
          {conditions.map(condition => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={`mobile-condition-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedConditions(prev => [...prev, condition]);
                  } else {
                    setSelectedConditions(prev => prev.filter(c => c !== condition));
                  }
                }}
              />
              <Label
                htmlFor={`mobile-condition-${condition}`}
                className="text-sm font-normal capitalize cursor-pointer"
              >
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="mobile-rare-only"
          checked={showRareOnly}
          onCheckedChange={(checked) => setShowRareOnly(!!checked)}
        />
        <Label
          htmlFor="mobile-rare-only"
          className="text-sm font-normal cursor-pointer"
        >
          Show rare items only
        </Label>
      </div>
      
      <Button
        variant="outline"
        onClick={resetFilters}
        size="sm"
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-4">Our Collection</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our extensive collection of rare and used toys. Each item has been carefully selected and curated for its uniqueness and quality.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters - desktop version */}
              {!isMobile && (
                <FiltersDesktop />
              )}
              
              {/* Main content */}
              <div className="flex-grow">
                {/* Search and sort */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="relative w-full sm:w-auto">
                    <Input
                      type="text"
                      placeholder="Search toys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-80"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {isMobile && (
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>
                              Refine your search with the following options
                            </SheetDescription>
                          </SheetHeader>
                          <FiltersMobile />
                        </SheetContent>
                      </Sheet>
                    )}
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
                        <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    Showing {filteredToys.length} item{filteredToys.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                {/* Results grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredToys.map((toy) => (
                    <ToyCard key={toy.id} toy={toy} />
                  ))}
                </div>
                
                {/* Empty state */}
                {filteredToys.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-lg font-medium mb-2">No items found</p>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button onClick={resetFilters}>Reset All Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collection;
