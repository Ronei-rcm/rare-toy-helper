import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'),
    defaultValue: 'pendente',
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  endereco_entrega: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'pedidos',
  timestamps: true,
  hooks: {
    beforeUpdate: async (pedido) => {
      // Validar transições de status
      if (pedido.changed('status')) {
        const statusAntigo = pedido.previous('status');
        const novoStatus = pedido.get('status');

        // Pedidos entregues ou cancelados não podem mudar de status
        if (statusAntigo === 'entregue' || statusAntigo === 'cancelado') {
          throw new Error(`Não é possível alterar o status de um pedido ${statusAntigo}`);
        }

        // Validar sequência de status
        const statusValidos = {
          pendente: ['confirmado', 'cancelado'],
          confirmado: ['enviado', 'cancelado'],
          enviado: ['entregue', 'cancelado'],
          entregue: [],
          cancelado: []
        };

        if (!statusValidos[statusAntigo].includes(novoStatus)) {
          throw new Error(`Transição de status inválida: ${statusAntigo} -> ${novoStatus}`);
        }
      }
    }
  }
});

const ItemPedido = sequelize.define('ItemPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pedidos',
      key: 'id'
    }
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
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
  }
}, {
  tableName: 'itens_pedido',
  timestamps: true
});

export { Pedido, ItemPedido };
