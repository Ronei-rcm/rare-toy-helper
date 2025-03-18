import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'categorias',
  timestamps: true
});

export default Categoria;
