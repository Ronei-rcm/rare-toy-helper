
import { ToyItem } from '../components/ToyCard';

export interface ProductItem extends ToyItem {}

export const popularProducts: ToyItem[] = [
  {
    id: "1",
    name: "Vintage Transformer Action Figure",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Action Figures",
    condition: "excellent",
    year: "1985",
    isRare: true
  },
  {
    id: "2",
    name: "Classic Star Wars X-Wing Fighter",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Vehicles",
    condition: "good",
    year: "1978"
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
    isRare: true
  },
  {
    id: "4",
    name: "Retro Nintendo Game Boy",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Electronic Toys",
    condition: "fair",
    year: "1989"
  }
];
