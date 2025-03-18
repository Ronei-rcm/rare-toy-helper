import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';
import bcrypt from 'bcryptjs';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('senha', hash);
      }
    }
  },
  tipo: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario',
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  underscored: true
});

// Método para verificar senha
Usuario.prototype.verificarSenha = async function(senha) {
  try {
    return await bcrypt.compare(senha, this.senha);
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    return false;
  }
};

export default Usuario;
