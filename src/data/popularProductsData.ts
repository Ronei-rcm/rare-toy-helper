
export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export const popularProducts: ProductItem[] = [
  {
    id: "p1",
    name: "Optimus Prime G1",
    category: "action-figures",
    price: 1299.90,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p2",
    name: "Barbie Coleção 1975",
    category: "vintage-dolls",
    price: 799.90,
    image: "https://images.unsplash.com/photo-1613682988402-a12e5e13cba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p3",
    name: "Ferrari F40 Escala 1:18",
    category: "model-vehicles",
    price: 549.90,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p4",
    name: "Game Boy Original",
    category: "electronic-toys",
    price: 899.90,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p5",
    name: "LEGO Space Set 1986",
    category: "building-toys",
    price: 1249.90,
    image: "https://images.unsplash.com/photo-1578652520385-c05f6f3b5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "p6",
    name: "Monopólio Vintage",
    category: "board-games",
    price: 399.90,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  }
];
