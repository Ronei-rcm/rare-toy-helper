import express from 'express';
import { verificarAutenticacao } from '../middleware/auth.js';
import { Pedido, ItemPedido, Produto, Carrinho, sequelize } from '../models/index.js';

const router = express.Router();

// Middleware de autenticação para todas as rotas
router.use(verificarAutenticacao);

// Listar pedidos do usuário
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { usuario_id: req.usuario.id },
      include: [{
        model: ItemPedido,
        include: [Produto]
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pedidos' });
  }
});

// Detalhes de um pedido específico
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findOne({
      where: {
        id: req.params.id,
        usuario_id: req.usuario.id
      },
      include: [{
        model: ItemPedido,
        include: [Produto]
      }]
    });

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedido' });
  }
});

// Criar pedido a partir do carrinho
router.post('/', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { endereco_entrega } = req.body;

    // Buscar itens do carrinho
    const itensCarrinho = await Carrinho.findAll({
      where: { usuario_id: req.usuario.id },
      include: [Produto],
      transaction: t
    });

    if (itensCarrinho.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Carrinho vazio' });
    }

    // Verificar estoque
    for (const item of itensCarrinho) {
      if (item.quantidade > item.Produto.estoque) {
        await t.rollback();
        return res.status(400).json({
          message: `Estoque insuficiente para o produto ${item.Produto.nome}`
        });
      }
    }

    // Calcular valor total
    const valorTotal = itensCarrinho.reduce((total, item) => {
      return total + (item.quantidade * item.preco_unitario);
    }, 0);

    // Criar pedido
    const pedido = await Pedido.create({
      usuario_id: req.usuario.id,
      status: 'pendente',
      valor_total: valorTotal,
      endereco_entrega
    }, { transaction: t });

    // Criar itens do pedido e atualizar estoque
    for (const item of itensCarrinho) {
      await ItemPedido.create({
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario,
        subtotal: item.quantidade * item.preco_unitario
      }, { transaction: t });

      // Atualizar estoque
      await item.Produto.update({
        estoque: item.Produto.estoque - item.quantidade
      }, { transaction: t });
    }

    // Limpar carrinho
    await Carrinho.destroy({
      where: { usuario_id: req.usuario.id },
      transaction: t
    });

    await t.commit();

    // Retornar pedido criado com seus itens
    const pedidoCompleto = await Pedido.findByPk(pedido.id, {
      include: [{
        model: ItemPedido,
        include: [Produto]
      }]
    });

    res.status(201).json(pedidoCompleto);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
});

// Atualizar status do pedido
router.patch('/:id/status', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar status
    const statusValidos = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'];
    if (!statusValidos.includes(status)) {
      await t.rollback();
      return res.status(400).json({ message: 'Status inválido', statusValidos });
    }

    // Buscar pedido
    const pedido = await Pedido.findOne({
      where: { id, usuario_id: req.usuario.id },
      include: [{
        model: ItemPedido,
        include: [Produto]
      }],
      transaction: t
    });

    if (!pedido) {
      await t.rollback();
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Se o pedido está sendo cancelado, devolver produtos ao estoque
    if (status === 'cancelado' && pedido.status !== 'cancelado') {
      for (const item of pedido.ItemPedidos) {
        await item.Produto.update({
          estoque: item.Produto.estoque + item.quantidade
        }, { transaction: t });
      }
    }

    // Atualizar status
    await pedido.update({ status }, { transaction: t });

    await t.commit();

    res.json(pedido);
  } catch (error) {
    await t.rollback();
    if (error.message.includes('Transição de status inválida')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro ao atualizar status do pedido' });
  }
});

export default router;
