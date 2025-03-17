
export type OrderStatus = "pendente" | "processando" | "enviado" | "entregue" | "cancelado";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  trackingCode?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
