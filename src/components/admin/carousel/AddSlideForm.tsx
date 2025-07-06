
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { DialogFooter } from '../../ui/dialog';
import { Checkbox } from '../../ui/checkbox';
import { CarouselSlide } from '../../../types/carousel';
import { ImageUploader } from '../ImageUploader';

interface AddSlideFormProps {
  onAddSlide: (slide: Omit<CarouselSlide, 'id'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const AddSlideForm = ({ onAddSlide, onCancel, loading = false }: AddSlideFormProps) => {
  const [newSlide, setNewSlide] = useState<Omit<CarouselSlide, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    active: true
  });

  const handleAddSlide = () => {
    if (!newSlide.title.trim() || !newSlide.imageUrl.trim()) {
      toast.error('Título e imagem são obrigatórios');
      return;
    }

    onAddSlide(newSlide);
    
    // Reset form
    setNewSlide({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      active: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSlide(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-6 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Título *</Label>
        <Input 
          id="title" 
          name="title"
          value={newSlide.title} 
          onChange={handleInputChange}
          placeholder="Digite um título atrativo para o slide"
          disabled={loading}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea 
          id="description" 
          name="description"
          value={newSlide.description || ''} 
          onChange={handleInputChange}
          placeholder="Descrição que aparecerá no slide (opcional)"
          disabled={loading}
          rows={2}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="link">Link de Destino</Label>
        <Input 
          id="link" 
          name="link"
          value={newSlide.link || ''} 
          onChange={handleInputChange}
          placeholder="/collection, /categories/nintendo, etc."
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          Link interno para onde o usuário será direcionado ao clicar no slide
        </p>
      </div>
      
      <div className="grid gap-2">
        <ImageUploader
          selectedImage={newSlide.imageUrl}
          onImageChange={(imageUrl) => setNewSlide(prev => ({ ...prev, imageUrl }))}
          label="Imagem do Slide *"
        />
        <p className="text-xs text-muted-foreground">
          Recomendado: imagens com proporção 16:9 (ex: 1920x1080px) para melhor qualidade
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="active"
          checked={newSlide.active}
          onCheckedChange={(checked) => setNewSlide(prev => ({ ...prev, active: !!checked }))}
          disabled={loading}
        />
        <Label htmlFor="active" className="flex flex-col">
          <span>Slide ativo</span>
          <span className="text-xs text-muted-foreground font-normal">
            Slides inativos não aparecerão no carrossel
          </span>
        </Label>
      </div>

      <DialogFooter className="pt-4 border-t">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleAddSlide} disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Slide'}
        </Button>
      </DialogFooter>
    </div>
  );
};
