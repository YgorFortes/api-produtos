'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
 await queryInterface.createTable('FornecedorProduto', {
   id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fornecedor_id:{
      type: Sequelize.INTEGER,
      references: {model: 'Fornecedores', key: 'id'},
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      allowNull: false,
    },
    produto_id:{
      type: Sequelize.INTEGER,
      references:{model: 'Produtos', key: 'id'},
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }

  }
  );
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
