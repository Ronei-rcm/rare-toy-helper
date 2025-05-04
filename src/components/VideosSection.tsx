
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import { Button } from "./ui/button";

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  createdAt: string;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando a busca de vídeos da API
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        // Em um cenário real, isso seria uma chamada para sua API
        // const response = await fetch('/api/videos');
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
            Meus Vídeos
          </span>
          <h2 className="text-3xl font-bold mb-4">Confira minhas aventuras em vídeo</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aqui compartilho momentos especiais das minhas viagens e experiências. Assista aos vídeos curtos e divirta-se!
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Film className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum vídeo disponível</h3>
            <p className="text-gray-500">Em breve novos vídeos serão adicionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video overflow-hidden group cursor-pointer" onClick={() => handleVideoClick(video)}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-medium mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">
                      {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleVideoClick(video)}>
                      Assistir <Play className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden">
              <div className="p-4 flex justify-between items-center border-b">
                <h3 className="font-medium text-lg">{selectedVideo.title}</h3>
                <button 
                  onClick={closeVideoModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video">
                <iframe 
                  src={selectedVideo.url} 
                  title={selectedVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700">{selectedVideo.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Publicado em: {new Date(selectedVideo.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
