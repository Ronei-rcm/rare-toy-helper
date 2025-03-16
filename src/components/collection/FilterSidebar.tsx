
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';

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

interface FilterSidebarProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedConditions: string[];
  handleConditionToggle: (condition: string) => void;
}

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  selectedConditions,
  handleConditionToggle
}: FilterSidebarProps) => {
  return (
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
  );
};

export { categories, conditions, conditionNames };
export default FilterSidebar;
