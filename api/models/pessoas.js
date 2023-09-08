'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Servicos, {
        foreignKey: 'pessoa_id'
      })
      Pessoas.hasMany(models.Vendas, {
        foreignKey: 'pessoa_id'
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validarNome(dado){
          if(dado.length <3 ){
            throw new Error('Nome deve ser maior que 3 caracteres')
          }
        }
      }
    },
    idade: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: {
          args: true,
          msg: 'O campo idade precisa ser um campo inteiro'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      unique:true,
      validate: {
        is: {
          args: /^\d{3}[\.-]?\d{3}[\.-]?\d{3}-?\d{2}$/,
          msg: 'Dados do tipo cpf inválidos'
        }
        }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados do tipo email inválidos'
        }
      }
    },
    endereco: DataTypes.STRING,
    funcao: DataTypes.STRING,
    ativo: {
      type: DataTypes.BOOLEAN,
      validate:{
        isIn: {
          args: [[true, false]],
          msg: 'O campo ativo precisa ser true ou false para cadastrar'
        }
      }
    }
  }, {
    sequelize,
    paranoid:true,
    defaultScope: {where :{ativo: true}}, //Mostrando só pessoas ativas 
    scopes: {desativadas: {where: {ativo: false}}},
    scopes: {todas: {where: {}}},
    modelName: 'Pessoas',
  });

  return Pessoas;
};