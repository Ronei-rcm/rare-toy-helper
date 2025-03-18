import express from 'express';
import { verificarAutenticacao } from '../middleware/auth.js';
import { Avaliacao, Usuario, Produto, sequelize } from '../models/index.js';

const router = express.Router();

// Middleware de autenticação para todas as rotas
router.use(verificarAutenticacao);

// Listar avaliações de um produto
router.get('/produto/:produto_id', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { produto_id: req.params.produto_id },
      include: [{
        model: Usuario,
        attributes: ['id', 'nome']
      }],
      order: [['createdAt', 'DESC']]
    });

    // Calcular média das avaliações
    const notas = avaliacoes.map(a => a.nota);
    const media = notas.length > 0
      ? notas.reduce((a, b) => a + b) / notas.length
      : 0;

    res.json({
      avaliacoes,
      media: parseFloat(media.toFixed(1)),
      total: avaliacoes.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar avaliações' });
  }
});

// Listar avaliações do usuário autenticado
router.get('/minhas', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { usuario_id: req.usuario.id },
      include: [{
        model: Produto,
        attributes: ['id', 'nome', 'imagem_url']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar avaliações' });
  }
});

// Criar nova avaliação
router.post('/', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { produto_id, nota, comentario, data_compra } = req.body;

    // Validar nota
    if (!nota || nota < 1 || nota > 5) {
      await t.rollback();
      return res.status(400).json({
        message: 'Nota inválida. Deve ser um número entre 1 e 5'
      });
    }

    // Verificar se o produto existe
    const produto = await Produto.findByPk(produto_id, { transaction: t });
    if (!produto) {
      await t.rollback();
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verificar se o usuário já avaliou este produto
    const avaliacaoExistente = await Avaliacao.findOne({
      where: {
        usuario_id: req.usuario.id,
        produto_id
      },
      transaction: t
    });

    if (avaliacaoExistente) {
      await t.rollback();
      return res.status(400).json({
        message: 'Você já avaliou este produto',
        avaliacao: avaliacaoExistente
      });
    }

    // Criar avaliação
    const avaliacao = await Avaliacao.create({
      usuario_id: req.usuario.id,
      produto_id,
      nota,
      comentario,
      data_compra
    }, { transaction: t });

    await t.commit();

    // Retornar avaliação com dados do usuário
    const avaliacaoCompleta = await Avaliacao.findByPk(avaliacao.id, {
      include: [{
        model: Usuario,
        attributes: ['id', 'nome']
      }]
    });

    res.status(201).json(avaliacaoCompleta);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Erro ao criar avaliação' });
  }
});

// Atualizar avaliação existente
router.put('/:id', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { nota, comentario } = req.body;

    // Validar nota
    if (nota && (nota < 1 || nota > 5)) {
      await t.rollback();
      return res.status(400).json({
        message: 'Nota inválida. Deve ser um número entre 1 e 5'
      });
    }

    // Buscar avaliação
    const avaliacao = await Avaliacao.findOne({
      where: {
        id: req.params.id,
        usuario_id: req.usuario.id
      },
      transaction: t
    });

    if (!avaliacao) {
      await t.rollback();
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    // Atualizar avaliação
    await avaliacao.update({
      nota: nota || avaliacao.nota,
      comentario: comentario !== undefined ? comentario : avaliacao.comentario
    }, { transaction: t });

    await t.commit();

    // Retornar avaliação atualizada com dados do usuário
    const avaliacaoAtualizada = await Avaliacao.findByPk(avaliacao.id, {
      include: [{
        model: Usuario,
        attributes: ['id', 'nome']
      }]
    });

    res.json(avaliacaoAtualizada);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Erro ao atualizar avaliação' });
  }
});

// Remover avaliação
router.delete('/:id', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const resultado = await Avaliacao.destroy({
      where: {
        id: req.params.id,
        usuario_id: req.usuario.id
      },
      transaction: t
    });

    if (!resultado) {
      await t.rollback();
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    await t.commit();
    res.status(204).send();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Erro ao remover avaliação' });
  }
});

export default router;
