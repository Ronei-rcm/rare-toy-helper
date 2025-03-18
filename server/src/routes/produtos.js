import express from 'express';
import { verificarAutenticacao } from '../middleware/auth.js';
import { Produto, Categoria, Avaliacao, Usuario } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

// Listar produtos com filtros e paginação
router.get('/', async (req, res) => {
  try {
    const {
      categoria_id,
      nome,
      preco_min,
      preco_max,
      em_estoque,
      page = 1,
      limit = 10
    } = req.query;

    // Construir filtros
    const where = {};
    if (categoria_id) where.categoria_id = categoria_id;
    if (nome) where.nome = { [Op.like]: `%${nome}%` };
    if (preco_min) where.preco = { ...where.preco, [Op.gte]: preco_min };
    if (preco_max) where.preco = { ...where.preco, [Op.lte]: preco_max };
    if (em_estoque === 'true') where.estoque = { [Op.gt]: 0 };

    // Calcular offset para paginação
    const offset = (page - 1) * limit;

    // Buscar produtos
    const { count, rows: produtos } = await Produto.findAndCountAll({
      where,
      include: [{
        model: Categoria,
        attributes: ['id', 'nome']
      }, {
        model: Avaliacao,
        attributes: ['nota'],
        required: false
      }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    // Calcular média das avaliações para cada produto
    const produtosComMedia = produtos.map(produto => {
      const avaliacoes = produto.Avaliacoes || [];
      const media = avaliacoes.length > 0
        ? avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length
        : 0;

      const { Avaliacoes, ...produtoSemAvaliacoes } = produto.toJSON();
      return {
        ...produtoSemAvaliacoes,
        media_avaliacoes: parseFloat(media.toFixed(1)),
        total_avaliacoes: avaliacoes.length
      };
    });

    res.json({
      produtos: produtosComMedia,
      total: count,
      paginas: Math.ceil(count / limit),
      pagina_atual: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos' });
  }
});

// Obter produto por ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id, {
      include: [{
        model: Categoria,
        attributes: ['id', 'nome']
      }, {
        model: Avaliacao,
        include: [{
          model: Usuario,
          attributes: ['id', 'nome']
        }]
      }]
    });

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Calcular média das avaliações
    const avaliacoes = produto.Avaliacoes || [];
    const media = avaliacoes.length > 0
      ? avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length
      : 0;

    const produtoJSON = produto.toJSON();
    produtoJSON.media_avaliacoes = parseFloat(media.toFixed(1));
    produtoJSON.total_avaliacoes = avaliacoes.length;

    res.json(produtoJSON);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
});

// Criar novo produto (requer autenticação de admin)
router.post('/', verificarAutenticacao, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.usuario.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const {
      nome,
      descricao,
      preco,
      estoque,
      categoria_id,
      imagem_url
    } = req.body;

    // Validações básicas
    if (!nome || !preco || !categoria_id) {
      return res.status(400).json({
        message: 'Nome, preço e categoria são obrigatórios'
      });
    }

    if (preco <= 0) {
      return res.status(400).json({
        message: 'O preço deve ser maior que zero'
      });
    }

    if (estoque < 0) {
      return res.status(400).json({
        message: 'O estoque não pode ser negativo'
      });
    }

    // Verificar se a categoria existe
    const categoria = await Categoria.findByPk(categoria_id);
    if (!categoria) {
      return res.status(400).json({
        message: 'Categoria não encontrada'
      });
    }

    // Criar produto
    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      estoque,
      categoria_id,
      imagem_url
    });

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
});

// Atualizar produto (requer autenticação de admin)
router.put('/:id', verificarAutenticacao, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.usuario.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const {
      nome,
      descricao,
      preco,
      estoque,
      categoria_id,
      imagem_url
    } = req.body;

    // Buscar produto
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Validações
    if (preco && preco <= 0) {
      return res.status(400).json({
        message: 'O preço deve ser maior que zero'
      });
    }

    if (estoque && estoque < 0) {
      return res.status(400).json({
        message: 'O estoque não pode ser negativo'
      });
    }

    if (categoria_id) {
      const categoria = await Categoria.findByPk(categoria_id);
      if (!categoria) {
        return res.status(400).json({
          message: 'Categoria não encontrada'
        });
      }
    }

    // Atualizar produto
    await produto.update({
      nome: nome || produto.nome,
      descricao: descricao !== undefined ? descricao : produto.descricao,
      preco: preco || produto.preco,
      estoque: estoque !== undefined ? estoque : produto.estoque,
      categoria_id: categoria_id || produto.categoria_id,
      imagem_url: imagem_url !== undefined ? imagem_url : produto.imagem_url
    });

    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
});

// Remover produto (requer autenticação de admin)
router.delete('/:id', verificarAutenticacao, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.usuario.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const resultado = await Produto.destroy({
      where: { id: req.params.id }
    });

    if (!resultado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover produto' });
  }
});

export default router;
