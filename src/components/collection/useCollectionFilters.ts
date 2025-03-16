
import { useState, useEffect } from 'react';
import { ToyItem } from '@/components/ToyCard';

export const useCollectionFilters = (initialProducts: ToyItem[]) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Função para lidar com a alternância de condição
  const handleConditionToggle = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition) 
        : [...prev, condition]
    );
  };

  // Efeito para filtrar produtos
  useEffect(() => {
    let filtered = [...initialProducts];
    
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
  }, [searchTerm, selectedCategory, selectedConditions, priceRange, sortBy, initialProducts]);

  return {
    filteredProducts,
    priceRange,
    setPriceRange,
    selectedCategory,
    setSelectedCategory,
    selectedConditions,
    handleConditionToggle,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy
  };
};
