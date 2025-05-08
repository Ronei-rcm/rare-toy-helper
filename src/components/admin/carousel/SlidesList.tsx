
import { Trash } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { CarouselSlide } from '../../../types/carousel';

interface SlidesListProps {
  slides: CarouselSlide[];
  onRemoveSlide: (id: string) => void;
}

export const SlidesList = ({ slides, onRemoveSlide }: SlidesListProps) => {
  if (slides.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum slide cadastrado</p>
      </div>
    );
  }

  return (
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
              onClick={() => onRemoveSlide(slide.id)}
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
  );
};
