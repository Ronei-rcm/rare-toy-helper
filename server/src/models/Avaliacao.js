import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Avaliacao = sequelize.define('Avaliacao', {
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
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_compra: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'avaliacoes',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['usuario_id', 'produto_id']
    }
  ]
});

export default Avaliacao;
