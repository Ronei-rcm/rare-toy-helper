import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ProductSearch({ searchTerm, onSearchChange }: ProductSearchProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center w-full max-w-sm space-x-2">
        <Input 
          type="search" 
          placeholder="Buscar brinquedos por nome ou categoria..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost" title="Buscar">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filtrar
      </Button>
    </div>
  );
}
