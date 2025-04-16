
// Type declarations for data modules

declare module '@/data/categoriesData' {
  export interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    featured?: boolean;
    count: number;
    productCount?: number;
  }
  
  export const categories: CategoryItem[];
}

declare module '@/data/popularProductsData' {
  export interface ProductItem {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    sales: number;
  }
  export const popularProducts: ProductItem[];
}

declare module '@/data/toysData' {
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
  
  export const toys: Toy[];
  export const products: ToyItem[];
}
