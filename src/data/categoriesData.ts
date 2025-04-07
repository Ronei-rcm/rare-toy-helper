
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  featured?: boolean;
  productCount?: number;
}

export const categories: CategoryItem[] = [
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Figuras de ação colecionáveis",
    image: "/categories/action-figures.jpg",
    featured: true,
    productCount: 48
  },
  {
    id: "pelucias",
    name: "Bichinhos de Pelúcia",
    description: "Pelúcias e brinquedos de pelúcia",
    image: "/categories/pelucias.jpg",
    featured: true,
    productCount: 32
  },
  {
    id: "jogos-tabuleiro",
    name: "Jogos de Tabuleiro",
    description: "Jogos de tabuleiro clássicos e colecionáveis",
    image: "/categories/board-games.jpg",
    featured: false,
    productCount: 25
  },
  {
    id: "carros",
    name: "Carrinhos e Veículos",
    description: "Miniaturas de carros e veículos colecionáveis",
    image: "/categories/cars.jpg",
    featured: true,
    productCount: 56
  },
  {
    id: "bonecas",
    name: "Bonecas",
    description: "Bonecas colecionáveis e vintage",
    image: "/categories/dolls.jpg",
    featured: true,
    productCount: 42
  },
  {
    id: "lego",
    name: "Blocos e LEGO",
    description: "Conjuntos de blocos e LEGO colecionáveis",
    image: "/categories/lego.jpg",
    featured: false,
    productCount: 37
  },
  {
    id: "videogames",
    name: "Videogames Retrô",
    description: "Consoles e jogos clássicos",
    image: "/categories/retro-games.jpg",
    featured: false,
    productCount: 28
  },
  {
    id: "ofertas",
    name: "Ofertas Especiais",
    description: "Produtos com descontos e promoções",
    image: "/categories/deals.jpg",
    featured: true,
    productCount: 19
  }
];
