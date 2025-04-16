
import { useState } from 'react';
import { ToyItem } from '../ToyCard';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImageUploader } from './ImageUploader';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ProductFormProps {
  initialProduct?: ToyItem;
  onSave: (product: ToyItem) => void;
  buttonText?: string;
}

export const ProductForm = ({ initialProduct, onSave, buttonText = "Add Product" }: ProductFormProps) => {
  const [product, setProduct] = useState<ToyItem>(() => {
    if (initialProduct) {
      return { ...initialProduct };
    }
    return {
      id: String(Date.now()),
      name: '',
      price: 0,
      image: '/placeholder.svg',
      category: '',
      condition: 'good',
      year: '',
      isRare: false,
      description: '',
      stock: 1,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'originalPrice' || name === 'stock') {
      setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product);
  };

  const setImage = (imageUrl: string) => {
    setProduct(prev => ({ ...prev, image: imageUrl }));
  };

  const conditionOptions = [
    { label: "Mint (Perfeito)", value: "mint" },
    { label: "Excellent (Excelente)", value: "excellent" },
    { label: "Good (Bom)", value: "good" },
    { label: "Fair (Regular)", value: "fair" }
  ];

  // Map Portuguese condition names to English values that match our type
  const conditionMapping: Record<string, "mint" | "excellent" | "good" | "fair"> = {
    "novo": "mint",
    "otimo": "excellent",
    "bom": "good",
    "regular": "fair"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Preço Original (opcional)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                step="0.01"
                value={product.originalPrice || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condição</Label>
              <select
                id="condition"
                name="condition"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={product.condition}
                onChange={handleChange}
                required
              >
                {conditionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-2">
            <Label htmlFor="image">Imagem</Label>
            <div className="flex flex-col items-center gap-4">
              <img 
                src={product.image} 
                alt={product.name || 'Preview'}
                className="w-full h-40 object-contain bg-gray-100 rounded-md"
              />
              <ImageUploader 
                selectedImage={product.image} 
                onImageChange={setImage} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Input
            id="year"
            name="year"
            value={product.year || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">Estoque</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={product.stock || 0}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2 flex items-end">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isRare"
              checked={product.isRare || false}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Item Raro/Colecionável</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <textarea
          id="description"
          name="description"
          value={product.description || ''}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  );
};
