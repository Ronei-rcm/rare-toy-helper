
// Type declarations for data modules

declare module '@/data/categoriesData' {
  export interface CategoryItem {
    id: string;
    name: string;
    description: string;
    image: string;
    featured?: boolean;
    productCount?: number;
  }
  
  export const categories: CategoryItem[];
}

declare module '@/data/popularProductsData' {
  import { ToyItem } from '@/components/ToyCard';
  export const popularProducts: ToyItem[];
}

declare module '@/data/toysData' {
  import { ToyItem } from '@/components/ToyCard';
  export const toys: ToyItem[];
}
