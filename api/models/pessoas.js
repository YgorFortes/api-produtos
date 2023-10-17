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
      Pessoas.belongsTo(models.Login, {
        foreignKey: 'login_id',
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
    data_nascimento: {
      type: DataTypes.DATE,
      validate:{
        isDate: {
          args: true,
          msg:  'Formato inválido de data'
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
    scopes: {
      desativados: {where: {ativo: false}},
      todas: {where: {}}
    },
    modelName: 'Pessoas',
  });

  return Pessoas;
};