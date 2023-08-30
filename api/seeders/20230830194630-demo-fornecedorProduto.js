'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FornecedorProduto', [
      {
        fornecedor_id : 1,
        produto_id    : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fornecedor_id : 1,
        produto_id    : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fornecedor_id : 1,
        produto_id    : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fornecedor_id : 2,
        produto_id    : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fornecedor_id : 2,
        produto_id    : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
