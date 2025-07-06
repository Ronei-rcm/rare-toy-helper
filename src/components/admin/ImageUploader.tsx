
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, X, ImageIcon, Link } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export interface ImageUploaderProps {
  selectedImage: string | null;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  className?: string;
  variant?: "default" | "compact";
}

export function ImageUploader({ 
  selectedImage, 
  onImageChange, 
  label = "Imagem",
  className = "",
  variant = "default"
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      
      // Verificar o tipo de arquivo
      if (!file.type.match('image.*')) {
        toast.error("Por favor, selecione apenas arquivos de imagem.");
        setLoading(false);
        return;
      }

      // Verificar o tamanho do arquivo (limite de 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("A imagem deve ter menos de 10MB.");
        setLoading(false);
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onImageChange(result);
          toast.success("Imagem carregada com sucesso!");
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Erro ao carregar a imagem.");
        setLoading(false);
      }
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast.error("Por favor, insira uma URL válida.");
      return;
    }

    // Validação básica de URL de imagem
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    const isImageUrl = imageExtensions.test(urlInput) || urlInput.includes('unsplash.com') || urlInput.includes('images.unsplash.com');
    
    if (!isImageUrl && !urlInput.startsWith('http')) {
      toast.error("Por favor, insira uma URL válida de imagem.");
      return;
    }

    setLoading(true);
    
    // Testar se a imagem carrega
    const img = new Image();
    img.onload = () => {
      onImageChange(urlInput);
      setUrlInput("");
      toast.success("Imagem carregada com sucesso!");
      setLoading(false);
    };
    img.onerror = () => {
      toast.error("Não foi possível carregar a imagem desta URL.");
      setLoading(false);
    };
    img.src = urlInput;
  };

  const handleRemoveImage = () => {
    onImageChange("");
    setUrlInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Imagem removida.");
  };

  const hasImage = selectedImage && selectedImage !== "/placeholder.svg" && selectedImage !== "";
  const heightClass = variant === "compact" ? "h-32" : "h-48";

  return (
    <div className={`space-y-4 ${className}`}>
      {label && <Label className="text-sm font-medium">{label}</Label>}
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            URL
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {hasImage ? (
              <div className={`relative w-full ${heightClass} group`}>
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-full object-contain border rounded-lg bg-gray-50"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    disabled={loading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className={`border-2 border-dashed border-muted-foreground/25 rounded-lg w-full ${heightClass} flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all ${loading ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                ) : (
                  <>
                    <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-sm text-muted-foreground font-medium">Clique para fazer upload</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG, WEBP ou SVG (max. 10MB)</p>
                  </>
                )}
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
              disabled={loading}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-4">
            {hasImage && (
              <div className={`relative w-full ${heightClass} group`}>
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-full object-contain border rounded-lg bg-gray-50"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    disabled={loading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                placeholder="Cole a URL da imagem aqui..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <Button 
                onClick={handleUrlSubmit} 
                disabled={loading || !urlInput.trim()}
                size="default"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "Carregar"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Exemplo: https://images.unsplash.com/photo-exemplo.jpg
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
