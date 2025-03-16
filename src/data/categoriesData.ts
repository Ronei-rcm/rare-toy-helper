
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  featured: boolean;
}

export const categories: CategoryItem[] = [
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Figuras colecionáveis de séries e franquias populares",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 24,
    featured: true
  },
  {
    id: "vintage-dolls",
    name: "Bonecas Vintage",
    description: "Bonecas clássicas e raras de diferentes épocas",
    image: "https://images.unsplash.com/photo-1603644607623-90727346ca8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 18,
    featured: true
  },
  {
    id: "model-vehicles",
    name: "Modelos de Veículos",
    description: "Modelos detalhados em escala de carros, aviões e mais",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 35,
    featured: true
  },
  {
    id: "electronic-toys",
    name: "Brinquedos Eletrônicos",
    description: "Jogos eletrônicos retrô e aparelhos de diversão vintage",
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 16,
    featured: true
  },
  {
    id: "building-toys",
    name: "Brinquedos de Construção",
    description: "Conjuntos de construção, blocos e sistemas de montagem",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 22,
    featured: false
  },
  {
    id: "board-games",
    name: "Jogos de Tabuleiro",
    description: "Jogos de tabuleiro clássicos e raros de diferentes décadas",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 14,
    featured: false
  },
  {
    id: "plush-toys",
    name: "Bichinhos de Pelúcia",
    description: "Animais de pelúcia colecionáveis e personagens históricos",
    image: "https://images.unsplash.com/photo-1563901935883-cb61f5d49be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 20,
    featured: false
  },
  {
    id: "mechanical-toys",
    name: "Brinquedos Mecânicos",
    description: "Brinquedos de corda, relógio e mecânicos vintage",
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    count: 12,
    featured: false
  }
];
