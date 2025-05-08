
import { ImageIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '../../ui/carousel';
import { CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/card';
import { CarouselSlide } from '../../../types/carousel';

interface CarouselPreviewProps {
  slides: CarouselSlide[];
}

export const CarouselPreview = ({ slides }: CarouselPreviewProps) => {
  if (slides.length === 0) {
    return (
      <>
        <CardHeader>
          <CardTitle>Prévia do Carrossel</CardTitle>
          <CardDescription>
            Veja como o carrossel será exibido na página inicial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Nenhum slide adicionado</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-sm">
              Adicione slides ao carrossel para visualizá-los aqui
            </p>
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Prévia do Carrossel</CardTitle>
        <CardDescription>
          Veja como o carrossel será exibido na página inicial
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </>
  );
};
