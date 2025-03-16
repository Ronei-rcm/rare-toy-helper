
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, conditions, conditionNames } from "./FilterSidebar";

interface MobileFilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedConditions: string[];
  handleConditionToggle: (condition: string) => void;
}

const MobileFilterDialog = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  selectedConditions,
  handleConditionToggle
}: MobileFilterDialogProps) => {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
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
          <Button onClick={onClose} className="w-full">
            Aplicar Filtros
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileFilterDialog;
