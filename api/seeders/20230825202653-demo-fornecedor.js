'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Fornecedores', [
      {
       nome: 'BikeFornecdora',
       endereco: "Rua 48",
       telefone: "61-996456485",
       cnpj: "84565946448",
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        nome: 'Fornecedora pc',
        endereco: "Rua 54",
        telefone: "61-54645654654",
        cnpj: "8456594645645448",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Fornecedora celular',
        endereco: "Rua 484",
        telefone: "61-44564565465446",
        cnpj: "84565946448",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Fornecedora motos',
        endereco: "Rua 4854",
        telefone: "61-456456456",
        cnpj: "8456787486785946448",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Fornecedora carros',
        endereco: "Rua 48",
        telefone: "61-4577",
        cnpj: "45345456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
