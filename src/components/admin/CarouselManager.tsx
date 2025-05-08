
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

// Mock inicial de slides (deve ser substituído por dados do backend)
const initialSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Promoção de Brinquedos',
    description: 'Confira nossos descontos especiais',
    imageUrl: 'https://images.unsplash.com/photo-1558507845-2638ecb28c7e',
    link: '/promotions'
  },
  {
    id: '2',
    title: 'Colecionáveis Raros',
    description: 'Novas aquisições para sua coleção',
    imageUrl: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8',
    link: '/new-arrivals'
  }
];

const CarouselManager = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Simulação de carregamento de slides do backend
  useEffect(() => {
    // Aqui seria implementada a chamada API para buscar slides
    // Por enquanto, usamos os slides iniciais
    console.log('Carregando slides do carrossel');
  }, []);

  // Funções para gerenciar slides
  const handleAddSlide = (newSlideData: Omit<CarouselSlide, 'id'>) => {
    const slide: CarouselSlide = {
      ...newSlideData,
      id: Date.now().toString()
    };

    setSlides([...slides, slide]);
    setIsDialogOpen(false);
    toast.success('Slide adicionado com sucesso!');
  };

  const handleRemoveSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
    toast.success('Slide removido com sucesso!');
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
            <Button>
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
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Prévia do carrossel */}
      <Card>
        <CarouselPreview slides={slides} />
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselManager;
