
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  count: number;
  products?: number; // Number of products in this category
}

export const categories: CategoryItem[] = [
  {
    id: "1",
    name: "Action Figures",
    slug: "action-figures",
    description: "Figuras de ação colecionáveis de diversas franquias populares como Star Wars, Transformers e He-Man",
    image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    count: 156
  },
  {
    id: "2",
    name: "Bichinhos de Pelúcia",
    slug: "pelucias",
    description: "Pelúcias vintage e modernas, incluindo ursos Steiff e personagens licenciados",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    count: 89
  },
  {
    id: "3",
    name: "Jogos de Tabuleiro",
    slug: "jogos-tabuleiro",
    description: "Jogos clássicos vintage e edições especiais para colecionadores",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    count: 67
  },
  {
    id: "4",
    name: "Videogames Retrô",
    slug: "videogames-retro",
    description: "Consoles vintage, cartuchos raros e acessórios de várias gerações de videogames",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    count: 234
  },
  {
    id: "5",
    name: "Blocos de Montar",
    slug: "blocos-montar",
    description: "Sets vintage de Lego, Mega Construx e outras marcas colecionáveis",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    count: 145
  },
  {
    id: "6",
    name: "Carrinhos Vintage",
    slug: "carrinhos-vintage",
    description: "Hot Wheels, Matchbox e outras miniaturas de veículos colecionáveis",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false,
    count: 312
  },
  {
    id: "7",
    name: "Personagens Nintendo",
    slug: "nintendo",
    description: "Brinquedos e figuras de personagens clássicos da Nintendo como Mario, Luigi e Pokémon",
    image: "https://images.unsplash.com/photo-1578305682257-676e77f43ede?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    count: 198
  },
  {
    id: "8",
    name: "Bonecas Vintage",
    slug: "bonecas-vintage",
    description: "Barbies antigas, bonecas de porcelana e outros itens colecionáveis para bonequeiras",
    image: "https://images.unsplash.com/photo-1578662996442-48f18103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true,
    count: 78
  }
];

// Add products export to be consistent with the import in components
export const products = [...categories];
