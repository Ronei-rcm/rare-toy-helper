
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sales: number;
}

export const popularProducts: ProductItem[] = [
  {
    id: "1",
    name: "Boneco Star Wars Vintage",
    price: 299.90,
    image: "/products/star-wars-figure.jpg",
    category: "Action Figures",
    description: "Boneco original da primeira coleção Star Wars dos anos 80",
    sales: 53
  },
  {
    id: "2",
    name: "Urso de Pelúcia Retrô",
    price: 149.90,
    image: "/products/retro-bear.jpg",
    category: "Bichinhos de Pelúcia",
    description: "Urso de pelúcia com design dos anos 60, cuidadosamente restaurado",
    sales: 42
  },
  {
    id: "3",
    name: "Jogo Banco Imobiliário Antigo",
    price: 189.90,
    image: "/products/monopoly-vintage.jpg",
    category: "Jogos de Tabuleiro",
    description: "Edição original do clássico jogo Banco Imobiliário dos anos 70",
    sales: 38
  },
  {
    id: "4",
    name: "Console Nintendo NES",
    price: 899.90,
    image: "/products/nintendo-nes.jpg",
    category: "Videogames Retrô",
    description: "Console Nintendo Entertainment System em perfeito estado de funcionamento",
    sales: 35
  },
  {
    id: "5",
    name: "Boneca Barbie 1980",
    price: 359.90,
    image: "/products/barbie-1980.jpg",
    category: "Action Figures",
    description: "Boneca Barbie original da coleção de 1980, item de colecionador",
    sales: 32
  },
  {
    id: "6",
    name: "Hot Wheels Série Limitada 1995",
    price: 129.90,
    image: "/products/hot-wheels-1995.jpg",
    category: "Miniaturas",
    description: "Conjunto de carrinhos Hot Wheels da série limitada de 1995",
    sales: 29
  }
];
