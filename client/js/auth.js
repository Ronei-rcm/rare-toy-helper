// Configuração da API
const API_URL = 'http://localhost:3002/api';

// Gerenciamento do token
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Funções de autenticação
class Auth {
    static getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    static getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    static setAuth(token, user) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    static clearAuth() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    static isAdmin() {
        const user = this.getUser();
        return user && user.tipo === 'admin';
    }

    static async login(email, senha) {
        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao fazer login');
            }

            const data = await response.json();
            this.setAuth(data.token, data.usuario);

            // Redirecionar com base no tipo de usuário
            if (data.usuario.tipo === 'admin') {
                showAdminPanel();
            } else {
                window.location.href = '/catalogo.html';
            }

            return data;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    static logout() {
        this.clearAuth();
        window.location.href = '/';
    }
}

// Manipulação do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    try {
        await Auth.login(email, senha);
    } catch (error) {
        alert(error.message);
    }
});

// Manipulação do botão de logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    Auth.logout();
});

// Função para mostrar o painel administrativo
function showAdminPanel() {
    document.getElementById('loginSection').classList.add('d-none');
    document.getElementById('adminSection').classList.remove('d-none');
    loadAdminData();
}

// Verificar autenticação ao carregar a página
window.addEventListener('load', () => {
    const token = Auth.getToken();
    const user = Auth.getUser();
    
    if (token && user) {
        if (user.tipo === 'admin') {
            showAdminPanel();
        } else {
            window.location.href = '/catalogo.html';
        }
    }
});
