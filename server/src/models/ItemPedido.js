import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const ItemPedido = sequelize.define('ItemPedido', {
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pedidos',
      key: 'id'
    }
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Produtos',
      key: 'id'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: (item) => {
      if (item.quantidade && item.preco_unitario) {
        item.subtotal = item.quantidade * item.preco_unitario;
      }
    }
  }
});

export default ItemPedido;
