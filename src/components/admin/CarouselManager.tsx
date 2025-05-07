
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '../ui/carousel';

// Interface para os slides do carrossel
interface CarouselSlide {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

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
  const [newSlide, setNewSlide] = useState<Omit<CarouselSlide, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Simulação de carregamento de slides do backend
  useEffect(() => {
    // Aqui seria implementada a chamada API para buscar slides
    // Por enquanto, usamos os slides iniciais
    console.log('Carregando slides do carrossel');
  }, []);

  // Funções para gerenciar slides
  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.imageUrl) {
      toast.error('Título e imagem são obrigatórios');
      return;
    }

    const slide: CarouselSlide = {
      ...newSlide,
      id: Date.now().toString()
    };

    setSlides([...slides, slide]);
    setIsDialogOpen(false);
    setNewSlide({
      title: '',
      description: '',
      imageUrl: '',
      link: ''
    });
    setPreviewImage(null);
    toast.success('Slide adicionado com sucesso!');
  };

  const handleRemoveSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
    toast.success('Slide removido com sucesso!');
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
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddSlide}>
                Adicionar Slide
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Prévia do carrossel */}
      <Card>
        <CardHeader>
          <CardTitle>Prévia do Carrossel</CardTitle>
          <CardDescription>
            Veja como o carrossel será exibido na página inicial
          </CardDescription>
        </CardHeader>
        <CardContent>
          {slides.length > 0 ? (
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {slides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="relative p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src={slide.imageUrl} 
                          alt={slide.title}
                          className="w-full aspect-[21/9] object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-xl font-semibold text-white">{slide.title}</h3>
                          {slide.description && (
                            <p className="text-white/90 text-sm mt-2">{slide.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">Nenhum slide adicionado</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-sm">
                Adicione slides ao carrossel para visualizá-los aqui
              </p>
            </div>
          )}
        </CardContent>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slides.map((slide) => (
              <Card key={slide.id} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <img 
                    src={slide.imageUrl} 
                    alt={slide.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium">{slide.title}</h3>
                  {slide.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{slide.description}</p>
                  )}
                  {slide.link && (
                    <p className="text-xs text-blue-600 truncate mt-1">Link: {slide.link}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleRemoveSlide(slide.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {slides.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum slide cadastrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselManager;
