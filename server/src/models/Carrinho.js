import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Carrinho = sequelize.define('Carrinho', {
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
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'carrinho',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['usuario_id', 'produto_id']
    }
  ]
});

export default Carrinho;
