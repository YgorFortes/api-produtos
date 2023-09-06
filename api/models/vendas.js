'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vendas.belongsTo(models.Pessoas, {
        foreignKey: 'pessoa_id'
      })
      Vendas.hasMany(models.ItemVendas,{
        foreignKey: 'venda_id'
      })
    }
  }
  Vendas.init({
    data_pagamento: DataTypes.DATE,
    data_entrega: DataTypes.DATEONLY,
    data_venda: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Vendas',
  });
  return Vendas;
};