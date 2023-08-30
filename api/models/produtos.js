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
        through: "fornecedor_produto",
        foreignKey: "produto_id"
      }
      )  
    }
  }
  
  Produtos.init({
    nome: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtos',
  });
  return Produtos;
};