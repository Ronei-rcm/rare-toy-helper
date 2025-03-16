
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ToyCard, { ToyItem } from '@/components/ToyCard';
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';

// Lista simulada de produtos
const products: ToyItem[] = [
  {
    id: "1",
    name: "Transformers G1 Optimus Prime",
    price: 1299.90,
    originalPrice: 1499.90,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "action-figures",
    condition: "good",
    year: "1984",
    isRare: true
  },
  {
    id: "2",
    name: "Star Wars Millennium Falcon",
    price: 899.90,
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "model-vehicles",
    condition: "excellent",
    year: "1995"
  },
  {
    id: "3",
    name: "Barbie Vintage Colecionável",
    price: 599.90,
    originalPrice: 699.90,
    image: "https://images.unsplash.com/photo-1613682998402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "vintage-dolls",
    condition: "mint",
    year: "1975",
    isRare: true
  },
  {
    id: "4",
    name: "Game Boy Classic Nintendo",
    price: 799.90,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "electronic-toys",
    condition: "fair",
    year: "1989"
  },
  {
    id: "5",
    name: "Robô de Lata Vintage",
    price: 1499.90,
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "mechanical-toys",
    condition: "good",
    year: "1965",
    isRare: true
  },
  {
    id: "6",
    name: "LEGO Espaço Vintage",
    price: 899.90,
    originalPrice: 999.90,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "building-toys",
    condition: "excellent",
    year: "1985"
  },
  {
    id: "7",
    name: "Casa de Bonecas Vitoriana",
    price: 2499.90,
    image: "https://images.unsplash.com/photo-1617096199249-88fa7859a80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "plush-toys",
    condition: "excellent",
    year: "1925"
  },
  {
    id: "8",
    name: "Monopólio Edição Vintage",
    price: 399.90,
    originalPrice: 499.90,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "board-games",
    condition: "good",
    year: "1956"
  }
];

// Lista de categorias para o filtro
const categories = [
  { id: "all", name: "Todas Categorias" },
  { id: "action-figures", name: "Action Figures" },
  { id: "vintage-dolls", name: "Bonecas Vintage" },
  { id: "model-vehicles", name: "Modelos de Veículos" },
  { id: "electronic-toys", name: "Brinquedos Eletrônicos" },
  { id: "building-toys", name: "Brinquedos de Construção" },
  { id: "board-games", name: "Jogos de Tabuleiro" },
  { id: "plush-toys", name: "Bichinhos de Pelúcia" },
  { id: "mechanical-toys", name: "Brinquedos Mecânicos" }
];

// Lista de condições para o filtro
const conditions = ["mint", "excellent", "good", "fair"];
const conditionNames: Record<string, string> = {
  "mint": "Perfeito",
  "excellent": "Excelente", 
  "good": "Bom", 
  "fair": "Regular"
};

const Collection = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Função de filtragem
  useEffect(() => {
    let filtered = [...products];
    
    // Filtro por nome/pesquisa
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filtro por condição
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(product => 
        selectedConditions.includes(product.condition)
      );
    }
    
    // Filtro por preço
    filtered = filtered.filter(product => {
      const price = product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Ordenação
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.year && a.year) ? parseInt(b.year) - parseInt(a.year) : 0);
        break;
      case "oldest":
        filtered.sort((a, b) => (a.year && b.year) ? parseInt(a.year) - parseInt(b.year) : 0);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.isRare ? 1 : 0) - (a.isRare ? 1 : 0));
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedConditions, priceRange, inStockOnly, sortBy]);

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition) 
        : [...prev, condition]
    );
  };

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
              <h1 className="text-3xl font-bold mb-4">Nossa Coleção</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore nossa coleção única de brinquedos raros e colecionáveis. 
                Cada item é verificado quanto à autenticidade e vem com uma descrição detalhada.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Barra de busca e filtros */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="w-full md:w-auto flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pesquisar brinquedos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destaques</SelectItem>
                    <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                    <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="oldest">Mais Antigos</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filtros (Desktop) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-64 shrink-0 hidden md:block"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-4">Filtros</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Categorias</h4>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Preço</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={3000}
                        step={50}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>R${priceRange[0]}</span>
                      <span>R${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Condição</h4>
                    <div className="space-y-2">
                      {conditions.map(condition => (
                        <div key={condition} className="flex items-center">
                          <Checkbox 
                            id={`condition-${condition}`} 
                            checked={selectedConditions.includes(condition)}
                            onCheckedChange={() => handleConditionToggle(condition)}
                          />
                          <label
                            htmlFor={`condition-${condition}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {conditionNames[condition]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Filtros (Mobile) */}
              {isMobileFilterOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex md:hidden">
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    className="ml-auto w-4/5 max-w-sm bg-white h-full overflow-y-auto p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-medium text-lg">Filtros</h3>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Categorias</h4>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Preço</h4>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={3000}
                          step={50}
                          onValueChange={setPriceRange}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>R${priceRange[0]}</span>
                        <span>R${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Condição</h4>
                      <div className="space-y-2">
                        {conditions.map(condition => (
                          <div key={condition} className="flex items-center">
                            <Checkbox 
                              id={`mobile-condition-${condition}`} 
                              checked={selectedConditions.includes(condition)}
                              onCheckedChange={() => handleConditionToggle(condition)}
                            />
                            <label
                              htmlFor={`mobile-condition-${condition}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {conditionNames[condition]}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-6">
                      <Button onClick={() => setIsMobileFilterOpen(false)} className="w-full">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Lista de produtos */}
              <div className="flex-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <SlidersHorizontal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Nenhum produto encontrado</h3>
                    <p className="text-gray-600">Tente ajustar seus filtros para encontrar o que está procurando.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ToyCard
                          toy={product}
                          priority={index < 4}
                        />
                      </motion.div>
                    ))}
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
