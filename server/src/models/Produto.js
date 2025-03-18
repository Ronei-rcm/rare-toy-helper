import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'id'
    }
  },
  imagem_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'produtos',
  timestamps: true
});

export default Produto;
