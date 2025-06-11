
import { Trash, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { CarouselSlide } from '../../../types/carousel';

interface SlidesListProps {
  slides: CarouselSlide[];
  onRemoveSlide: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  loading?: boolean;
}

export const SlidesList = ({ slides, onRemoveSlide, onToggleStatus, loading = false }: SlidesListProps) => {
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
            <div className="absolute top-2 right-2">
              <Badge variant={slide.active ? "default" : "secondary"}>
                {slide.active ? "Ativo" : "Inativo"}
              </Badge>
            </div>
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
          <CardFooter className="flex justify-between pt-0 gap-2">
            <div className="flex gap-2">
              {onToggleStatus && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onToggleStatus(slide.id)}
                  disabled={loading}
                >
                  {slide.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              )}
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => onRemoveSlide(slide.id)}
                disabled={loading}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
