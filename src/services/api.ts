
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    let errorMessage = 'Erro na requisição';
    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      errorMessage = String(error.response.data.message);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
);

export const produtosAPI = {
  listarTodos: async () => {
    try {
      const response = await api.get('/produtos');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao listar produtos: ${error.message}`);
      }
      throw error;
    }
  },

  obterPorId: async (id: number) => {
    try {
      const response = await api.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao obter produto: ${error.message}`);
      }
      throw error;
    }
  },

  criar: async (produto: {
    nome: string;
    descricao: string;
    preco: number;
    categoria_id: number;
  }) => {
    try {
      const response = await api.post('/produtos', produto);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar produto: ${error.message}`);
      }
      throw error;
    }
  }
};

export default api;
