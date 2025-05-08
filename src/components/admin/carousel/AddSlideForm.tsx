
import { useState } from 'react';
import { toast } from 'sonner';
import { Trash, Upload } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { DialogFooter } from '../../ui/dialog';
import { CarouselSlide } from '../../../types/carousel';

interface AddSlideFormProps {
  onAddSlide: (slide: Omit<CarouselSlide, 'id'>) => void;
  onCancel: () => void;
}

export const AddSlideForm = ({ onAddSlide, onCancel }: AddSlideFormProps) => {
  const [newSlide, setNewSlide] = useState<Omit<CarouselSlide, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.imageUrl) {
      toast.error('Título e imagem são obrigatórios');
      return;
    }

    onAddSlide(newSlide);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Em um ambiente real, aqui seria feito upload para servidor
      // Por enquanto, apenas criamos uma URL de preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setNewSlide({...newSlide, imageUrl: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSlide(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Título</Label>
        <Input 
          id="title" 
          name="title"
          value={newSlide.title} 
          onChange={handleInputChange}
          placeholder="Digite um título para o slide"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input 
          id="description" 
          name="description"
          value={newSlide.description || ''} 
          onChange={handleInputChange}
          placeholder="Digite uma descrição"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="link">Link (opcional)</Label>
        <Input 
          id="link" 
          name="link"
          value={newSlide.link || ''} 
          onChange={handleInputChange}
          placeholder="Digite a URL para onde o slide deve direcionar"
        />
      </div>
      
      <div className="grid gap-2">
        <Label>Imagem</Label>
        <div className="flex flex-col gap-4">
          <div className="border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
            <Input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Clique para selecionar uma imagem</p>
              <p className="text-xs text-gray-400">Formatos aceitos: JPG, PNG, WebP</p>
            </div>
          </div>
          
          {previewImage && (
            <div className="mt-2 relative">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-auto max-h-[200px] rounded-md object-contain"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => {
                  setPreviewImage(null);
                  setNewSlide({...newSlide, imageUrl: ''});
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">URL da Imagem (alternativa ao upload)</Label>
        <Input 
          id="imageUrl" 
          name="imageUrl"
          value={newSlide.imageUrl} 
          onChange={handleInputChange}
          placeholder="Digite ou cole a URL da imagem"
          disabled={!!previewImage}
        />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleAddSlide}>
          Adicionar Slide
        </Button>
      </DialogFooter>
    </div>
  );
};
