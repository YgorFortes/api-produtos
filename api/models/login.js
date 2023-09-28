'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Login.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email inválido'
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@#$%&*_-]/,
          msg: 'A senha precisa ter pelo menos uma letra maiúsculas , minúsculas, um número e um carácter especial',
        },
        validarTamanho(dado){
          if(dado < 8 && dado >20){
            throw new Error('Nome deve ser maior que 3 caracteres');
          }
        },
        validarEspacoBranco(dado){
          const resultadoEspacoBranco = dado.indexOf(' ');
          if(resultadoEspacoBranco >=0){
            throw new Error('Não deixe espaço em branco na senha');
          }
        }
      }
    }
  }, 
  sequelize.define('Login', {
  }, {
    freezeTableName: true,
    tableName: 'Login'
  }), 
  {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};