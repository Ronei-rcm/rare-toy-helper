
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchAndSortProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sortOption: string) => void;
  openMobileFilter: () => void;
}

const SearchAndSort = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  openMobileFilter
}: SearchAndSortProps) => {
  return (
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
          onClick={openMobileFilter}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchAndSort;
