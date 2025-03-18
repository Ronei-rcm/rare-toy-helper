import express from 'express';
import { verificarAutenticacao } from '../middleware/auth.js';
import { Carrinho, Produto } from '../models/index.js';

const router = express.Router();

// Middleware de autenticação para todas as rotas
router.use(verificarAutenticacao);

// Listar itens do carrinho
router.get('/', async (req, res) => {
  try {
    const itens = await Carrinho.findAll({
      where: { usuario_id: req.usuario.id },
      include: [{
        model: Produto,
        attributes: ['id', 'nome', 'descricao', 'preco', 'estoque', 'imagem_url']
      }]
    });
    res.json(itens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar itens do carrinho' });
  }
});

// Adicionar item ao carrinho
router.post('/', async (req, res) => {
  try {
    const { produto_id, quantidade } = req.body;

    // Validar quantidade
    if (!quantidade || quantidade < 1) {
      return res.status(400).json({ message: 'Quantidade inválida' });
    }

    // Buscar produto
    const produto = await Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verificar estoque
    if (quantidade > produto.estoque) {
      return res.status(400).json({
        message: 'Quantidade indisponível',
        estoqueDisponivel: produto.estoque
      });
    }

    // Verificar se o produto já está no carrinho
    let itemCarrinho = await Carrinho.findOne({
      where: {
        usuario_id: req.usuario.id,
        produto_id
      }
    });

    if (itemCarrinho) {
      // Atualizar quantidade se já existe
      const novaQuantidade = itemCarrinho.quantidade + quantidade;
      if (novaQuantidade > produto.estoque) {
        return res.status(400).json({
          message: 'Quantidade total excede o estoque disponível',
          estoqueDisponivel: produto.estoque,
          quantidadeNoCarrinho: itemCarrinho.quantidade
        });
      }

      itemCarrinho = await itemCarrinho.update({
        quantidade: novaQuantidade,
        preco_unitario: produto.preco
      });
    } else {
      // Criar novo item no carrinho
      itemCarrinho = await Carrinho.create({
        usuario_id: req.usuario.id,
        produto_id,
        quantidade,
        preco_unitario: produto.preco
      });
    }

    // Retornar item com dados do produto
    const itemCompleto = await Carrinho.findByPk(itemCarrinho.id, {
      include: [{
        model: Produto,
        attributes: ['id', 'nome', 'descricao', 'preco', 'estoque', 'imagem_url']
      }]
    });

    res.status(201).json(itemCompleto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar item ao carrinho' });
  }
});

// Atualizar quantidade de um item
router.put('/:id', async (req, res) => {
  try {
    const { quantidade } = req.body;

    // Validar quantidade
    if (!quantidade || quantidade < 1) {
      return res.status(400).json({ message: 'Quantidade inválida' });
    }

    // Buscar item no carrinho
    const itemCarrinho = await Carrinho.findOne({
      where: {
        id: req.params.id,
        usuario_id: req.usuario.id
      },
      include: [Produto]
    });

    if (!itemCarrinho) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho' });
    }

    // Verificar estoque
    if (quantidade > itemCarrinho.Produto.estoque) {
      return res.status(400).json({
        message: 'Quantidade indisponível',
        estoqueDisponivel: itemCarrinho.Produto.estoque
      });
    }

    // Atualizar quantidade e preço unitário
    await itemCarrinho.update({
      quantidade,
      preco_unitario: itemCarrinho.Produto.preco
    });

    res.json(itemCarrinho);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar item do carrinho' });
  }
});

// Remover item do carrinho
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Carrinho.destroy({
      where: {
        id: req.params.id,
        usuario_id: req.usuario.id
      }
    });

    if (!resultado) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover item do carrinho' });
  }
});

// Limpar carrinho
router.delete('/', async (req, res) => {
  try {
    await Carrinho.destroy({
      where: { usuario_id: req.usuario.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao limpar carrinho' });
  }
});

export default router;
