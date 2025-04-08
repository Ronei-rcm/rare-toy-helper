
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  featured?: boolean;
  productCount?: number;
  count?: number; // Added to fix type errors
}

export const categories: CategoryItem[] = [
  {
    id: "action-figures",
    name: "Action Figures",
    description: "Collectible action figures from various franchises and eras",
    image: "/category-action-figures.jpg",
    featured: true,
    productCount: 48,
    count: 48
  },
  {
    id: "vintage-dolls",
    name: "Vintage Dolls",
    description: "Classic and rare dolls from the past decades",
    image: "/category-dolls.jpg",
    featured: true,
    productCount: 36,
    count: 36
  },
  {
    id: "model-vehicles",
    name: "Model Vehicles",
    description: "Detailed replicas of classic and rare vehicles",
    image: "/category-vehicles.jpg",
    featured: true,
    productCount: 24,
    count: 24
  },
  {
    id: "electronic-toys",
    name: "Electronic Toys",
    description: "Vintage electronic games and educational toys",
    image: "/category-electronic.jpg",
    featured: false,
    productCount: 18,
    count: 18
  },
  {
    id: "building-toys",
    name: "Building Toys",
    description: "Classic construction and building sets",
    image: "/category-building.jpg",
    featured: false,
    productCount: 29,
    count: 29
  },
  {
    id: "board-games",
    name: "Board Games",
    description: "Vintage and collectible board games",
    image: "/category-boardgames.jpg",
    featured: false,
    productCount: 32,
    count: 32
  }
];
