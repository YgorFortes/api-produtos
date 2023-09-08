'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async associate(models) {
      Produtos.belongsToMany(models.Fornecedores,{
        through: "FornecedorProduto",
        as :'fornecedores',
        foreignKey: "produto_id"
      }
      )  

      Produtos.hasMany(models.ItemVendas,{
        foreignKey: "produto_id"
      })
    }
  }
  
  Produtos.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Não é permitido campo nome vazio'
        }
      }
    },
    valor: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Válido somente números',
        }
      }
    },
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Produtos',
  });
  return Produtos;
};