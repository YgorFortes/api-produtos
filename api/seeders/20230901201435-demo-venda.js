'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('ItemVendas', [
      {
        quantidade: 5,
        valor: 45.95,
        venda_id: 5,
        produto_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantidade: 3,
        valor: 12.99,
        venda_id: 2,
        produto_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantidade: 1,
        valor: 99.99,
        venda_id: 3,
        produto_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantidade: 2,
        valor: 29.95,
        venda_id: 4,
        produto_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantidade: 4,
        valor: 19.99,
        venda_id: 1,
        produto_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
   
  },
  // vendas 5,
  // produto 11
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
