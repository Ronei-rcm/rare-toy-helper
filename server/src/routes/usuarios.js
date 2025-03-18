import express from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';
import { verificarAutenticacao, verificarAdmin } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Listar usuários (apenas retorna informações não sensíveis)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'tipo', 'ativo', 'createdAt']
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'email', 'tipo', 'ativo', 'createdAt']
    });
    
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro de usuário
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criar usuário
    const usuario = await Usuario.create({
      nome,
      email,
      senha,
      tipo: 'usuario',
      ativo: true
    });

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem a senha) e token
    res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      },
      token
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log('Tentativa de login:', { email });

    // Buscar usuário
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      console.log('Usuário não encontrado:', { email });
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar senha
    const senhaCorreta = await usuario.verificarSenha(senha);
    console.log('Verificação de senha:', { email, senhaCorreta });
    
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se usuário está ativo
    if (!usuario.ativo) {
      console.log('Usuário inativo:', { email });
      return res.status(401).json({ message: 'Usuário inativo' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem a senha) e token
    res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      },
      token
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

// Obter perfil do usuário autenticado
router.get('/perfil', verificarAutenticacao, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nome', 'email', 'tipo', 'ativo', 'createdAt']
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
});

// Atualizar perfil
router.put('/perfil', verificarAutenticacao, async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const usuario = await Usuario.findByPk(req.usuario.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await usuario.update({
      nome: nome || usuario.nome,
      senha: senha || usuario.senha
    });
    
    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar usuário
router.put('/:id', verificarAdmin, async (req, res) => {
  try {
    const { nome, email, senha, tipo, ativo } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Verificar se o novo email já está em uso
    if (email && email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
    }
    
    await usuario.update({
      nome: nome || usuario.nome,
      email: email || usuario.email,
      senha: senha || usuario.senha,
      tipo: tipo || usuario.tipo,
      ativo: ativo !== undefined ? ativo : usuario.ativo
    });
    
    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar usuário
router.delete('/:id', verificarAdmin, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
