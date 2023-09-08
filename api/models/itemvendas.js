'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemVendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemVendas.belongsTo(models.Vendas,{
        foreignKey: "venda_id"
      })
      
      ItemVendas.belongsTo(models.Produtos,{
        foreignKey: "produto_id"
      })
    }
  }
  ItemVendas.init({
    quantidade: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: {
          args: true,
          msg: 'O campo deve ser um número inteiro'
        }
      }
    },
    valor: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          args:true,
          msg: 'Campo valor é válido somente números'
        }
      }
    }
  }, {
    sequelize,
    paranoid:true,
    modelName: 'ItemVendas',
  });
  return ItemVendas;
};