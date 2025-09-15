
// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// Função para obter o token JWT do localStorage
export const getToken = () => localStorage.getItem('token');

// Headers padrão para requisições autenticadas
export const getAuthHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  const user = localStorage.getItem('user');
  return !!token && !!user;
};

// Função para verificar se o usuário é admin
export const isAdmin = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  try {
    const userData = JSON.parse(user);
    return userData.tipo === 'admin';
  } catch {
    return false;
  }
};

// REMOVED: Mock login with hardcoded credentials for security
// Authentication should use Supabase Auth only
