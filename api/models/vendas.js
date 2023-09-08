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
    data_pagamento: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Formato inválido de data'
        }
      }
    },
    data_entrega: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          args: true,
          msg: 'Formato inválido de data'
        },
        isAfter:{
          args: "2023-09-07",
          msg: 'Formato inválido de data. Data precisar ser depois de hoje'
        }
      }
    },
    data_venda:{
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Formato inválido de data'
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Vendas',
  });
  return Vendas;
};