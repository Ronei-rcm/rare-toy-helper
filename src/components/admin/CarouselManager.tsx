
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { AddSlideForm } from './carousel/AddSlideForm';
import { CarouselPreview } from './carousel/CarouselPreview';
import { SlidesList } from './carousel/SlidesList';
import { CarouselSlide } from '../../types/carousel';

// Mock inicial de slides
const initialSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Promoção de Brinquedos',
    description: 'Confira nossos descontos especiais',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e',
    link: '/promotions',
    active: true
  },
  {
    id: '2',
    title: 'Colecionáveis Raros',
    description: 'Novas aquisições para sua coleção',
    imageUrl: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8',
    link: '/new-arrivals',
    active: true
  }
];

const CarouselManager = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log('Carregando slides do carrossel');
  }, []);

  const handleAddSlide = async (newSlideData: Omit<CarouselSlide, 'id'>) => {
    try {
      setLoading(true);
      
      const slide: CarouselSlide = {
        ...newSlideData,
        id: Date.now().toString()
      };

      setSlides(prevSlides => [...prevSlides, slide]);
      setIsDialogOpen(false);
      toast.success('Slide adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar slide:', error);
      toast.error('Erro ao adicionar slide. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSlide = async (id: string) => {
    try {
      setLoading(true);
      setSlides(prevSlides => prevSlides.filter(slide => slide.id !== id));
      toast.success('Slide removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover slide:', error);
      toast.error('Erro ao remover slide. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSlideStatus = async (id: string) => {
    try {
      setSlides(prevSlides => 
        prevSlides.map(slide => 
          slide.id === id ? { ...slide, active: !slide.active } : slide
        )
      );
      toast.success('Status do slide atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar status do slide:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Carrossel</h2>
          <p className="text-muted-foreground">
            Gerencie os slides do carrossel exibidos na página inicial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={loading}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Slide</DialogTitle>
              <DialogDescription>
                Crie um novo slide para o carrossel da página inicial.
              </DialogDescription>
            </DialogHeader>
            
            <AddSlideForm 
              onAddSlide={handleAddSlide} 
              onCancel={() => setIsDialogOpen(false)}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Prévia do carrossel */}
      <Card>
        <CarouselPreview slides={slides.filter(slide => slide.active)} />
      </Card>
      
      {/* Lista de slides */}
      <Card>
        <CardHeader>
          <CardTitle>Slides Cadastrados</CardTitle>
          <CardDescription>
            Gerencie os slides existentes do carrossel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SlidesList 
            slides={slides} 
            onRemoveSlide={handleRemoveSlide}
            onToggleStatus={handleToggleSlideStatus}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselManager;
