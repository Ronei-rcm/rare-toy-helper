
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { products } from '@/data/toysData';
import { useCollectionFilters } from '@/components/collection/useCollectionFilters';
import FilterSidebar from '@/components/collection/FilterSidebar';
import MobileFilterDialog from '@/components/collection/MobileFilterDialog';
import SearchAndSort from '@/components/collection/SearchAndSort';
import ProductGrid from '@/components/collection/ProductGrid';
import CollectionHeader from '@/components/collection/CollectionHeader';

const Collection = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const {
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
  } = useCollectionFilters(products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <CollectionHeader />
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Barra de busca e filtros */}
            <SearchAndSort 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              openMobileFilter={() => setIsMobileFilterOpen(true)}
            />
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filtros (Desktop) */}
              <FilterSidebar 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedConditions={selectedConditions}
                handleConditionToggle={handleConditionToggle}
              />
              
              {/* Filtros (Mobile) */}
              <MobileFilterDialog 
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedConditions={selectedConditions}
                handleConditionToggle={handleConditionToggle}
              />
              
              {/* Lista de produtos */}
              <div className="flex-1">
                <ProductGrid products={filteredProducts} />
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
