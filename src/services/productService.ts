import { supabase } from '../integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  images?: string[];
  category_id?: string;
  stock_quantity: number;
  sku?: string;
  active: boolean;
  featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  slug: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const productService = {
  // Produtos
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('id', id)
      .eq('active', true)
      .single();

    if (error) throw error;
    return data as Product;
  },

  async getProductsByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('category_id', categoryId)
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async searchProducts(query: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  // Categorias
  async getAllCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('active', true)
      .order('name');

    if (error) throw error;
    return data as Category[];
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error) throw error;
    return data as Category;
  }
};