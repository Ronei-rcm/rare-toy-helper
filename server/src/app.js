import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';

// Importar rotas
import usuariosRoutes from './routes/usuarios.js';
import produtosRoutes from './routes/produtos.js';
import categoriasRoutes from './routes/categorias.js';
import carrinhoRoutes from './routes/carrinho.js';
import pedidosRoutes from './routes/pedidos.js';
import avaliacoesRoutes from './routes/avaliacoes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:8080', 'http://177.67.32.210:8080', 'http://172.18.0.1:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../client')));

// Rotas da API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

// Rota base da API
app.get('/api', (req, res) => {
  res.json({ message: 'API do Catálogo de Brinquedos' });
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Catálogo de Brinquedos está funcionando!' });
});

// Rota para todas as outras requisições - SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

// Sincronizar modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

export default app;
