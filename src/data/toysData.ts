
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
    nome: "Boneco Star Wars Luke Skywalker Vintage",
    descricao: "Boneco original do Luke Skywalker da primeira coleção Star Wars de 1977, na embalagem original lacrada",
    preco: 1299.90,
    estoque: 2,
    categoria: "Action Figures",
    imagem: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "mint",
    raro: true
  },
  {
    id: "2",
    nome: "Urso de Pelúcia Steiff Antigo",
    descricao: "Urso de pelúcia Steiff dos anos 50 com etiqueta original, peça de colecionador alemã autêntica",
    preco: 890.50,
    estoque: 1,
    categoria: "Bichinhos de Pelúcia",
    imagem: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: true
  },
  {
    id: "3",
    nome: "Jogo Banco Imobiliário Estrela 1944",
    descricao: "Primeira edição brasileira do Banco Imobiliário da Estrela de 1944, caixa original preservada",
    preco: 650.00,
    estoque: 1,
    categoria: "Jogos de Tabuleiro",
    imagem: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "good",
    raro: true
  },
  {
    id: "4",
    nome: "Console Nintendo Famicom Original",
    descricao: "Console Nintendo Famicom japonês de 1983, funcionando perfeitamente com controles originais",
    preco: 1890.00,
    estoque: 1,
    categoria: "Videogames Retrô",
    imagem: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: true
  },
  {
    id: "5",
    nome: "Boneca Barbie #1 Loira Ponytail 1959",
    descricao: "Primeira Barbie da Mattel de 1959, cabelo loiro ponytail, rosto pálido, item extremamente raro",
    preco: 8500.00,
    estoque: 1,
    categoria: "Bonecas Vintage",
    imagem: "https://images.unsplash.com/photo-1578662996442-48f18103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "good",
    raro: true
  },
  {
    id: "6",
    nome: "Action Figure Super Mario Bros Nintendo",
    descricao: "Figure oficial do Super Mario Bros da Nintendo, articulado, com acessórios removíveis",
    preco: 189.90,
    estoque: 12,
    categoria: "Personagens Nintendo",
    imagem: "https://images.unsplash.com/photo-1578305682257-676e77f43ede?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "mint",
    raro: false
  },
  {
    id: "7",
    nome: "Pelúcia Luigi Original Nintendo",
    descricao: "Pelúcia oficial do Luigi da Nintendo, material de alta qualidade, licenciada",
    preco: 149.90,
    estoque: 8,
    categoria: "Personagens Nintendo",
    imagem: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: false
  },
  {
    id: "8",
    nome: "Princesa Peach Amiibo Gold Edition",
    descricao: "Amiibo dourado da Princesa Peach, edição limitada, lacrado na embalagem original",
    preco: 599.90,
    estoque: 3,
    categoria: "Personagens Nintendo",
    imagem: "https://images.unsplash.com/photo-1574811222540-ce97cb12b8ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "mint",
    raro: true
  },
  {
    id: "9",
    nome: "Transformer Optimus Prime G1 1984",
    descricao: "Optimus Prime original da linha Generation 1 de 1984, completo com trailer e acessórios",
    preco: 2200.00,
    estoque: 1,
    categoria: "Action Figures",
    imagem: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: true
  },
  {
    id: "10",
    nome: "Carrinho Hot Wheels Redline 1968",
    descricao: "Hot Wheels da primeira série Redline de 1968, modelo Custom Camaro, pintura original",
    preco: 450.00,
    estoque: 2,
    categoria: "Carrinhos Vintage",
    imagem: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "good",
    raro: true
  },
  {
    id: "11",
    nome: "Jogo War Clássico Grow 1975",
    descricao: "Primeira edição brasileira do jogo War pela Grow de 1975, peças e tabuleiro originais",
    preco: 320.00,
    estoque: 4,
    categoria: "Jogos de Tabuleiro",
    imagem: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "good",
    raro: false
  },
  {
    id: "12",
    nome: "Game Boy Original Nintendo 1989",
    descricao: "Game Boy clássico cinza de 1989, funcionando, tela sem pixels mortos, inclui Tetris",
    preco: 750.00,
    estoque: 3,
    categoria: "Videogames Retrô",
    imagem: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: false
  },
  {
    id: "13",
    nome: "Pelúcia Pokémon Pikachu 1998",
    descricao: "Pelúcia oficial do Pikachu da primeira linha de produtos Pokémon de 1998, Nintendo/Game Freak",
    preco: 280.00,
    estoque: 6,
    categoria: "Bichinhos de Pelúcia",
    imagem: "https://images.unsplash.com/photo-1605979399919-d6ce4d7083be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: false
  },
  {
    id: "14",
    nome: "Lego Castle 6080 King's Castle 1984",
    descricao: "Set completo do Castelo do Rei da linha Castle de 1984, todas as peças e minifiguras originais",
    preco: 1450.00,
    estoque: 1,
    categoria: "Blocos de Montar",
    imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "excellent",
    raro: true
  },
  {
    id: "15",
    nome: "Boneco He-Man Masters of Universe 1982",
    descricao: "Action figure original do He-Man de 1982, articulações funcionando, espada e escudo inclusos",
    preco: 380.00,
    estoque: 5,
    categoria: "Action Figures",
    imagem: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    condicao: "good",
    raro: false
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
