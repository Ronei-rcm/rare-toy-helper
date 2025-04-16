
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
  export const products: CategoryItem[];
}

declare module '@/data/popularProductsData' {
  import { ToyItem } from '@/components/ToyCard';
  export const popularProducts: ToyItem[];
}

declare module '@/data/toysData' {
  import { ToyItem } from '@/components/ToyCard';
  export const toys: ToyItem[];
  export const products: ToyItem[];
}
