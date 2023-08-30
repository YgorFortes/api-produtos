'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Fornecedores', [
      {
        nome: "Caloi",
        endereco: "Rua 3 lote 4",
        telefone: "99-965649945",
        cnpj: "12.345.678/0001-00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Bike Mania",
        endereco: "Rua das Bicicletas, 123",
        telefone: "99-123456789",
        cnpj: "98.765.432/0001-21",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Pedalando Feliz",
        endereco: "Avenida das Flores, 456",
        telefone: "99-987654321",
        cnpj: "11.223.344/0001-09",
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
