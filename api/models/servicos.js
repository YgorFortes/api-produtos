'use strict';
const {
  Model
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
        foreignKey: 'pessoa_id'
      })
    }
  }
  Servicos.init({
    tipo: DataTypes.STRING,
    data_entrega: DataTypes.DATEONLY,
    preco: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Servicos',
  });
  return Servicos;
};