
import axios from 'axios';
import { toast } from 'sonner';

// Base API URL - use import.meta.env for Vite environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Ocorreu um erro na requisição';
    toast.error(message);
    return Promise.reject(error);
  }
);

// API services
export const produtosAPI = {
  listarTodos: async () => {
    try {
      // This is a mock - in a real app, we'd use: const response = await api.get('/produtos');
      // Simulating a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Sample data
      return [
        { id: 1, nome: "Action Figure Vintage", descricao: "Action figure colecionável em ótimo estado", preco: 149.99, categoria_id: 1 },
        { id: 2, nome: "Boneca Barbie Anos 90", descricao: "Boneca vintage em caixa original", preco: 199.99, categoria_id: 2 },
        { id: 3, nome: "Carrinho Hot Wheels Raro", descricao: "Miniatura rara em embalagem lacrada", preco: 89.99, categoria_id: 3 },
        { id: 4, nome: "LEGO Star Wars Completo", descricao: "Set completo com manual e caixa", preco: 299.99, categoria_id: 4 },
        { id: 5, nome: "Transformers G1", descricao: "Figura original dos anos 80", preco: 249.99, categoria_id: 1 },
        { id: 6, nome: "Urso de Pelúcia Vintage", descricao: "Pelúcia em excelente estado de conservação", preco: 79.99, categoria_id: 5 }
      ];
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw new Error(`Erro ao listar produtos: ${error.message}`);
    }
  }
};

export default api;
