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
    nome: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    endereco: DataTypes.STRING,
    funcao: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN
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