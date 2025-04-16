
export interface ToyItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  condition: 'mint' | 'excellent' | 'good' | 'fair';
  year?: string;
  isRare?: boolean;
  description?: string;
  stock?: number;
}

export interface Toy {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagem: string;
  condicao: "mint" | "excellent" | "good" | "fair";
  raro: boolean;
}

export const toys: Toy[] = [
  {
    id: "1",
    nome: "Boneco Star Wars Vintage",
    descricao: "Boneco original da primeira coleção Star Wars dos anos 80",
    preco: 299.90,
    estoque: 5,
    categoria: "Action Figures",
    imagem: "/products/star-wars-figure.jpg",
    condicao: "good",
    raro: true
  },
  {
    id: "2",
    nome: "Urso de Pelúcia Retrô",
    descricao: "Urso de pelúcia com design dos anos 60, cuidadosamente restaurado",
    preco: 149.90,
    estoque: 8,
    categoria: "Bichinhos de Pelúcia",
    imagem: "/products/retro-bear.jpg",
    condicao: "excellent",
    raro: false
  },
  {
    id: "3",
    nome: "Jogo Banco Imobiliário Antigo",
    descricao: "Edição original do clássico jogo Banco Imobiliário dos anos 70",
    preco: 189.90,
    estoque: 3,
    categoria: "Jogos de Tabuleiro",
    imagem: "/products/monopoly-vintage.jpg",
    condicao: "good",
    raro: true
  },
  {
    id: "4",
    nome: "Console Nintendo NES",
    descricao: "Console Nintendo Entertainment System em perfeito estado de funcionamento",
    preco: 899.90,
    estoque: 2,
    categoria: "Videogames Retrô",
    imagem: "/products/nintendo-nes.jpg",
    condicao: "fair",
    raro: true
  },
  {
    id: "5",
    nome: "Boneca Barbie 1980",
    descricao: "Boneca Barbie original da coleção de 1980, item de colecionador",
    preco: 359.90,
    estoque: 4,
    categoria: "Action Figures",
    imagem: "/products/barbie-1980.jpg",
    condicao: "mint",
    raro: true
  },
  {
    id: "6",
    nome: "Action Figure Mario",
    descricao: "Action figure colecionável do Mario em pose de corrida",
    preco: 189.90,
    estoque: 12,
    categoria: "Personagens Nintendo",
    imagem: "/nintendo/mario-figure.jpg",
    condicao: "mint",
    raro: false
  },
  {
    id: "7",
    nome: "Pelúcia Luigi",
    descricao: "Pelúcia oficial do Luigi feita com materiais de alta qualidade",
    preco: 149.90,
    estoque: 8,
    categoria: "Personagens Nintendo",
    imagem: "/nintendo/luigi-plush.jpg",
    condicao: "excellent",
    raro: false
  },
  {
    id: "8",
    nome: "Princesa Peach Colecionável",
    descricao: "Figura colecionável da Princesa Peach em seu vestido clássico",
    preco: 239.90,
    estoque: 5,
    categoria: "Personagens Nintendo",
    imagem: "/nintendo/peach-collectible.jpg",
    condicao: "mint",
    raro: true
  }
];

// Add products export to be consistent with the import in components
export const products = toys.map(toy => ({
  id: toy.id,
  name: toy.nome, 
  price: toy.preco,
  image: toy.imagem,
  category: toy.categoria,
  condition: toy.condicao,
  description: toy.descricao,
  stock: toy.estoque
})) as ToyItem[];
