import { Usuario, Categoria, Produto } from '../models/index.js';

export const initializeDatabase = async () => {
  try {
    // Criar usuário admin se não existir
    const adminExistente = await Usuario.findOne({ where: { email: 'admin@example.com' } });
    if (!adminExistente) {
      await Usuario.create({
        nome: 'Admin',
        email: 'admin@example.com',
        senha: 'admin123',
        tipo: 'admin',
        ativo: true
      });
      console.log('Usuário admin criado com sucesso!');
    }

    // Criar usuário normal se não existir
    const userExistente = await Usuario.findOne({ where: { email: 'usuario@example.com' } });
    if (!userExistente) {
      await Usuario.create({
        nome: 'Usuário',
        email: 'usuario@example.com',
        senha: 'user123',
        tipo: 'usuario',
        ativo: true
      });
      console.log('Usuário normal criado com sucesso!');
    }

    // Criar categorias se não existirem
    const categoriasNomes = ['Bonecos', 'Jogos de Tabuleiro', 'Carrinhos', 'Pelúcias'];
    for (const nome of categoriasNomes) {
      const categoriaExistente = await Categoria.findOne({ where: { nome } });
      if (!categoriaExistente) {
        const categoria = await Categoria.create({ nome });
        // Criar produtos de exemplo para a categoria
        await Produto.bulkCreate([
          {
            nome: `${categoria.nome} - Produto 1`,
            descricao: `Descrição do produto 1 da categoria ${categoria.nome}`,
            preco: Math.floor(Math.random() * 100) + 50,
            estoque: Math.floor(Math.random() * 50) + 10,
            categoria_id: categoria.id
          },
          {
            nome: `${categoria.nome} - Produto 2`,
            descricao: `Descrição do produto 2 da categoria ${categoria.nome}`,
            preco: Math.floor(Math.random() * 100) + 50,
            estoque: Math.floor(Math.random() * 50) + 10,
            categoria_id: categoria.id
          }
        ]);
        console.log(`Categoria ${nome} e seus produtos criados com sucesso!`);
      }
    }

    console.log('Verificação de dados iniciais concluída!');
  } catch (error) {
    console.error('Erro ao verificar/inserir dados iniciais:', error);
    throw error;
  }
};
