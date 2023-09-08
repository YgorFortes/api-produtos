'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fornecedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async associate(models) {
      Fornecedores.belongsToMany(models.Produtos,{
        through: "FornecedorProduto",
        as: "produtos",
        foreignKey: "fornecedor_id"
      }
      )  
    }
  }
  Fornecedores.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Não é permitido campo nome vazio'
        }
      }
    },
    endereco: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: 'Não é permitido campo endereço vazio'
      }
    },
    telefone: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: 
          ["^\\(?([1-9]{2})\\)?([ .-]?)([9]{1})([ .-]?)(\\d{4})([ .-]?)(\\d{4})$|^([ .-]?)([9]{1})([ .-]?)(\\d{4})([ .-]?)(\\d{4})$"],
          msg: 'Digite um número de telefone/celular válido'
        }
      }
    },
    cnpj: {
      type:DataTypes.STRING,
      validate: {
        is: {
          args: ["^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}\\-\\d{2}$"],
          msg: 'Digite um cnpj no formato válido'
        }
      }
    },
    
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Fornecedores',
  });
  return Fornecedores;
};