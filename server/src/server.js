import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, syncDatabase } from './models/index.js';
import { initializeDatabase } from './config/seeders.js';

// Configurar variáveis de ambiente antes de tudo
dotenv.config();

// Importar rotas
import usuariosRoutes from './routes/usuarios.js';
import produtosRoutes from './routes/produtos.js';
import categoriasRoutes from './routes/categorias.js';
import carrinhoRoutes from './routes/carrinho.js';
import pedidosRoutes from './routes/pedidos.js';
import avaliacoesRoutes from './routes/avaliacoes.js';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://177.67.32.210:8080', 'http://172.18.0.1:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Rota base
app.get('/', (req, res) => {
  res.json({ message: 'API do Catálogo de Brinquedos' });
});

// Rotas da API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = 3002;

async function startServer() {
  try {
    // Sincronizar modelos com o banco de dados
    await syncDatabase();
    console.log('Banco de dados sincronizado com sucesso.');

    // Inicializar dados de teste
    await initializeDatabase();
    console.log('Dados de teste inseridos com sucesso.');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Limpar processos anteriores na porta antes de iniciar
process.on('SIGTERM', () => {
  console.log('Encerrando servidor...');
  process.exit(0);
});

startServer();
