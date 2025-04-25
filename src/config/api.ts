
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

// Função para criar usuário mock (para demonstração)
export const mockLogin = (email: string, password: string) => {
  // Admin mock
  if (email === 'admin@example.com' && password === 'admin123') {
    const adminUser = {
      id: '1',
      nome: 'Administrador',
      email: 'admin@example.com',
      tipo: 'admin'
    };
    localStorage.setItem('user', JSON.stringify(adminUser));
    localStorage.setItem('token', 'mock-token-admin-12345');
    localStorage.setItem('isLoggedIn', 'true');
    return Promise.resolve({ usuario: adminUser, token: 'mock-token-admin-12345' });
  }
  
  // Cliente mock
  if (email === 'cliente@muhlstore.com' && password === 'cliente123') {
    const clientUser = {
      id: '2',
      nome: 'Cliente Demo',
      email: 'cliente@muhlstore.com',
      tipo: 'usuario'
    };
    localStorage.setItem('user', JSON.stringify(clientUser));
    localStorage.setItem('token', 'mock-token-client-12345');
    localStorage.setItem('isLoggedIn', 'true');
    return Promise.resolve({ usuario: clientUser, token: 'mock-token-client-12345' });
  }
  
  return Promise.reject(new Error('Credenciais inválidas'));
};
