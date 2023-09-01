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
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemVendas',
  });
  return ItemVendas;
};