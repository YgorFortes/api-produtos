'use strict';
const {
  Model, NOW
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Servicos.belongsTo(models.Pessoas, {
        foreignKey: 'pessoa_id',
      })
    }
  }
  const data = new Date();
  Servicos.init({
    tipo: DataTypes.STRING,
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
    preco: {
      type: DataTypes.FLOAT,
      validate:{
        isNumeric: {
          args: true,
          msg: 'Válido somente números'
        }
      }
    }
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Servicos',
  });
  return Servicos;
};