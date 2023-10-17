'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Servicos', [
    {
      tipo: "Manutenção",
      data_entrega: new Date(),
      preco: 45.50,
      pessoa_id: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      tipo: "Manutenção",
      data_entrega: new Date(),
      preco: 60.44,
      pessoa_id: 3,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      tipo: "Manutenção",
      data_entrega: new Date(),
      preco: 70.85,
      pessoa_id: 4,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      tipo: "Manutenção",
      data_entrega: new Date(),
      preco: 80.63,
      pessoa_id: 5,
      createdAt : new Date(),
      updatedAt : new Date()
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
