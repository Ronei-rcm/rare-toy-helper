import express from 'express';
import { verificarAutenticacao } from '../middleware/auth.js';
import { Categoria, Produto } from '../models/index.js';

const router = express.Router();

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [['nome', 'ASC']]
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar categorias' });
  }
});

// Obter categoria por ID com seus produtos
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id, {
      include: [{
        model: Produto,
        attributes: ['id', 'nome', 'descricao', 'preco', 'estoque', 'imagem_url']
      }]
    });

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
});

// Criar nova categoria (requer autenticação de admin)
router.post('/', verificarAutenticacao, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.usuario.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const { nome, descricao } = req.body;

    // Validar nome
    if (!nome) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    // Verificar se já existe categoria com o mesmo nome
    const categoriaExistente = await Categoria.findOne({
      where: { nome }
    });

    if (categoriaExistente) {
      return res.status(400).json({ message: 'Já existe uma categoria com este nome' });
    }

    // Criar categoria
    const categoria = await Categoria.create({
      nome,
      descricao
    });

    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
});

// Atualizar categoria (requer autenticação de admin)
router.put('/:id', verificarAutenticacao, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.usuario.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const { nome, descricao } = req.body;

    // Buscar categoria
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Verificar se já existe outra categoria com o mesmo nome
    if (nome && nome !== categoria.nome) {
      const categoriaExistente = await Categoria.findOne({
        where: { nome }
      });

      if (categoriaExistente) {
        return res.status(400).json({ message: 'Já existe uma categoria com este nome' });
      }
    }

    // Atualizar categoria
    await categoria.update({
      nome: nome || categoria.nome,
      descricao: descricao !== undefined ? descricao : categoria.descricao
    });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
});

// Remover categoria (requer autenticação de admin)
router.delete('/:id', verificarAutenticacao, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.usuario.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    // Verificar se existem produtos na categoria
    const produtosNaCategoria = await Produto.count({
      where: { categoria_id: req.params.id }
    });

    if (produtosNaCategoria > 0) {
      return res.status(400).json({
        message: 'Não é possível remover uma categoria que possui produtos'
      });
    }

    // Remover categoria
    const resultado = await Categoria.destroy({
      where: { id: req.params.id }
    });

    if (!resultado) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover categoria' });
  }
});

export default router;
