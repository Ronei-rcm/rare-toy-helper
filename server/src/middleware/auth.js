import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Middleware para verificar se o usuário está autenticado
export const verificarAutenticacao = async (req, res, next) => {
  try {
    // Verificar se o token foi fornecido
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuário
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se o usuário está ativo
    if (!usuario.ativo) {
      return res.status(401).json({ message: 'Usuário inativo' });
    }

    // Adicionar usuário ao request
    req.usuario = usuario;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    res.status(500).json({ message: 'Erro ao verificar autenticação' });
  }
};

// Middleware para verificar se o usuário é admin
export const verificarAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.tipo === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
  }
};
