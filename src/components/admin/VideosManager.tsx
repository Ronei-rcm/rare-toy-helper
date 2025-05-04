
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Film, Pencil, Trash2, Play, Upload, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface VideoForm {
  id?: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  createdAt: string;
}

export default function VideosManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<VideoForm>();

  useEffect(() => {
    // Simulando a busca de vídeos da API
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        // Em um cenário real, isso seria uma chamada para sua API
        // const response = await fetch('/api/admin/videos');
        // const data = await response.json();
        
        // Dados simulados para demonstração
        const mockVideos = [
          {
            id: 1,
            title: "Aventuras em Nova York",
            description: "Confira os melhores momentos da minha viagem para NY!",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            createdAt: "2023-07-15"
          },
          {
            id: 2,
            title: "Praia do Caribe",
            description: "Águas cristalinas e belas paisagens nas praias do Caribe",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            createdAt: "2023-08-22"
          },
          {
            id: 3,
            title: "Safari na África",
            description: "Uma experiência incrível em contato com a natureza selvagem",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            createdAt: "2023-09-05"
          }
        ];
        
        setVideos(mockVideos);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
        toast.error("Erro ao carregar vídeos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openAddVideoModal = () => {
    setIsEditing(false);
    reset({
      title: '',
      description: '',
      url: '',
      thumbnail: ''
    });
    setVideoModalOpen(true);
  };

  const openEditVideoModal = (video: Video) => {
    setIsEditing(true);
    setCurrentVideo(video);
    reset({
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail
    });
    setVideoModalOpen(true);
  };

  const openPreviewModal = (video: Video) => {
    setCurrentVideo(video);
    setPreviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setVideoModalOpen(false);
    setPreviewModalOpen(false);
    setCurrentVideo(null);
  };

  const onSubmit = async (data: VideoForm) => {
    try {
      if (isEditing && currentVideo) {
        // Em um cenário real, isso seria uma chamada PUT para sua API
        // await fetch(`/api/admin/videos/${currentVideo.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        
        // Simulando atualização
        const updatedVideos = videos.map((video) => 
          video.id === currentVideo.id 
            ? { ...video, ...data } 
            : video
        );
        setVideos(updatedVideos);
        toast.success("Vídeo atualizado com sucesso!");
      } else {
        // Em um cenário real, isso seria uma chamada POST para sua API
        // const response = await fetch('/api/admin/videos', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        // const newVideo = await response.json();
        
        // Simulando criação com ID aleatório
        const newVideo = {
          ...data,
          id: Math.floor(Math.random() * 1000) + 10,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setVideos([...videos, newVideo]);
        toast.success("Vídeo adicionado com sucesso!");
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar vídeo:", error);
      toast.error(isEditing ? "Erro ao atualizar vídeo" : "Erro ao adicionar vídeo");
    }
  };

  const handleDeleteVideo = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este vídeo?")) return;
    
    try {
      // Em um cenário real, isso seria uma chamada DELETE para sua API
      // await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
      
      // Simulando exclusão
      setVideos(videos.filter(video => video.id !== id));
      toast.success("Vídeo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir vídeo:", error);
      toast.error("Erro ao excluir vídeo");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Vídeos</h2>
          <p className="text-gray-500">Adicione e gerencie os vídeos que serão exibidos na página inicial</p>
        </div>
        <Button onClick={openAddVideoModal}>
          <Plus className="mr-2 h-4 w-4" /> Novo Vídeo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vídeos</CardTitle>
          <CardDescription>
            {videos.length} vídeo(s) cadastrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-16 border border-dashed rounded-lg">
              <Film className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum vídeo cadastrado</h3>
              <p className="text-gray-500 mb-4">Comece adicionando seu primeiro vídeo.</p>
              <Button onClick={openAddVideoModal}>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Vídeo
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Descrição</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="h-14 w-24 rounded overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {video.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => openPreviewModal(video)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openEditVideoModal(video)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal de Adicionar/Editar Vídeo */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Vídeo" : "Adicionar Novo Vídeo"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Título</label>
                <Input
                  id="title"
                  placeholder="Digite o título do vídeo"
                  {...register("title", { required: "Título é obrigatório" })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Descrição</label>
                <Textarea
                  id="description"
                  placeholder="Digite uma descrição para o vídeo"
                  {...register("description", { required: "Descrição é obrigatória" })}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">URL do Vídeo</label>
                <Input
                  id="url"
                  placeholder="URL do YouTube (ex: https://www.youtube.com/embed/VIDEO_ID)"
                  {...register("url", { required: "URL é obrigatória" })}
                />
                {errors.url && (
                  <p className="text-sm text-destructive">{errors.url.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="thumbnail" className="text-sm font-medium">URL da Thumbnail</label>
                <Input
                  id="thumbnail"
                  placeholder="URL da imagem de capa do vídeo"
                  {...register("thumbnail", { required: "Thumbnail é obrigatória" })}
                />
                {errors.thumbnail && (
                  <p className="text-sm text-destructive">{errors.thumbnail.message}</p>
                )}
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Pré-visualização */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {currentVideo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {currentVideo && (
              <iframe 
                src={currentVideo.url} 
                title={currentVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          {currentVideo && (
            <div>
              <h4 className="font-medium mb-1">Descrição:</h4>
              <p className="text-gray-600">{currentVideo.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                Publicado em: {new Date(currentVideo.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
