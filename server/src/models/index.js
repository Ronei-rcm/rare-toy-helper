import { sequelize } from '../config/sequelize.js';
import Usuario from './Usuario.js';
import Produto from './Produto.js';
import Categoria from './Categoria.js';
import Carrinho from './Carrinho.js';
import { Pedido, ItemPedido } from './Pedido.js';
import Avaliacao from './Avaliacao.js';

// Definir relacionamentos
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Carrinho, { foreignKey: 'usuario_id' });
Carrinho.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Avaliacao, { foreignKey: 'usuario_id' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Produto.hasMany(Carrinho, { foreignKey: 'produto_id' });
Carrinho.belongsTo(Produto, { foreignKey: 'produto_id' });

Produto.hasMany(ItemPedido, { foreignKey: 'produto_id' });
ItemPedido.belongsTo(Produto, { foreignKey: 'produto_id' });

Produto.hasMany(Avaliacao, { foreignKey: 'produto_id' });
Avaliacao.belongsTo(Produto, { foreignKey: 'produto_id' });

Produto.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Categoria.hasMany(Produto, { foreignKey: 'categoria_id' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedido_id' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

// Função para sincronizar o banco de dados
export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos com o banco de dados
    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
    throw error;
  }
};

// Exportar modelos e sequelize
export {
  sequelize,
  Usuario,
  Produto,
  Categoria,
  Carrinho,
  Pedido,
  ItemPedido,
  Avaliacao
};
