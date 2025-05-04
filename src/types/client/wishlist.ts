
// Wishlist related types

export interface WishlistItem {
  id: string;
  productId: string;  // Added productId for compatibility
  name: string;
  price: number;
  image?: string;
  addedAt?: string;
  isInStock?: boolean;
  nome?: string;   // Added for backward compatibility
  preco?: number;  // Added for backward compatibility
  imagem?: string; // Added for backward compatibility
}
