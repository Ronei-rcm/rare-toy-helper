
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  count: number; // Added count property to fix errors
  products?: number; // Number of products in this category
}

export const categories: CategoryItem[] = [
  {
    id: "1",
    name: "Action Figures",
    slug: "action-figures",
    description: "Figuras de ação colecionáveis de diversas franquias populares",
    image: "/categories/action-figures.jpg",
    featured: true,
    count: 48
  },
  {
    id: "2",
    name: "Bichinhos de Pelúcia",
    slug: "pelucias",
    description: "Pelúcias e bichos de pelúcia para todas as idades",
    image: "/categories/pelucias.jpg",
    featured: true,
    count: 32
  },
  {
    id: "3",
    name: "Jogos de Tabuleiro",
    slug: "jogos-tabuleiro",
    description: "Jogos clássicos e modernos para toda a família",
    image: "/categories/jogos-tabuleiro.jpg",
    featured: true,
    count: 25
  },
  {
    id: "4",
    name: "Videogames Retrô",
    slug: "videogames-retro",
    description: "Consoles e cartuchos de videogames de várias gerações",
    image: "/categories/videogames.jpg",
    featured: false,
    count: 56
  },
  {
    id: "5",
    name: "Modelos Colecionáveis",
    slug: "modelos",
    description: "Kits de modelos para montar e colecionar",
    image: "/categories/modelos.jpg",
    featured: false,
    count: 18
  },
  {
    id: "6",
    name: "Miniaturas",
    slug: "miniaturas",
    description: "Miniaturas de carros, aviões e outros veículos",
    image: "/categories/miniaturas.jpg",
    featured: false,
    count: 37
  }
];
