
import { ToyItem } from '../components/ToyCard';

export const toys: ToyItem[] = [
  {
    id: "1",
    name: "Vintage Transformer Action Figure",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Action Figures",
    condition: "excellent",
    year: "1985",
    isRare: true,
    description: "A classic Transformer figure from the original 1980s collection. In excellent condition with minimal wear.",
    stock: 2
  },
  {
    id: "2",
    name: "Classic Star Wars X-Wing Fighter",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Vehicles",
    condition: "good",
    year: "1978",
    description: "Vintage Star Wars X-Wing Fighter toy from the original trilogy era. Shows light play wear but all parts intact.",
    stock: 1
  },
  {
    id: "3",
    name: "Collectible Barbie Doll Limited Edition",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1613682988402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dolls",
    condition: "mint",
    year: "1992",
    isRare: true,
    description: "Limited edition Barbie from 1992, never removed from box. Perfect mint condition with original packaging.",
    stock: 1
  },
  {
    id: "4",
    name: "Retro Nintendo Game Boy",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Electronic Toys",
    condition: "fair",
    year: "1989",
    description: "Original Game Boy in working condition. Shows signs of use and has some yellowing on the case.",
    stock: 3
  },
  {
    id: "5",
    name: "Vintage Tin Robot",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Mechanical Toys",
    condition: "good",
    year: "1960",
    isRare: true,
    description: "Mid-century tin robot toy with wind-up mechanism. Still works perfectly and has beautiful vintage patina.",
    stock: 1
  },
  {
    id: "6",
    name: "LEGO Space Set Complete",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Building Toys",
    condition: "excellent",
    year: "1995",
    description: "Complete LEGO Space set from the 90s with all original pieces and instruction manual. Box shows minimal wear.",
    stock: 1
  },
  {
    id: "7",
    name: "Miniature Dollhouse Set",
    price: 199.99,
    originalPrice: 250.00,
    image: "https://images.unsplash.com/photo-1617096199249-88fa7859a80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Dollhouses",
    condition: "excellent",
    year: "1980",
    description: "Detailed vintage dollhouse with handcrafted furniture and working lights. An exceptional collector's piece.",
    stock: 1
  },
  {
    id: "8",
    name: "Vintage Board Game Collection",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Board Games",
    condition: "good",
    year: "1970",
    description: "Collection of three classic board games from the 1970s. All games are complete with original pieces.",
    stock: 1
  }
];

// Alias for Collection page
export const products = toys;
