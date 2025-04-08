
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

export interface ImageUploaderProps {
  selectedImage: string | null;
  onImageChange: (imageUrl: string) => void;
}

export function ImageUploader({ selectedImage, onImageChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar o tipo de arquivo
      if (!file.type.match('image.*')) {
        toast.error("Por favor, selecione apenas arquivos de imagem.");
        return;
      }

      // Verificar o tamanho do arquivo (limite de 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter menos de 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange("/placeholder.svg");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center gap-4">
        {selectedImage && selectedImage !== "/placeholder.svg" ? (
          <div className="relative w-full h-48">
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-full object-contain border rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Clique para fazer upload</p>
            <p className="text-xs text-gray-400">PNG, JPG ou WEBP (max. 5MB)</p>
          </div>
        )}
        <Input
          id="product-image"
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
