'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert('Pessoas', [
        {
          nome: 'Ygor Fortes',
          data_nascimento: "1998-07-01",
          cpf: '547-986-854-96',
          endereco: 'rua 2',
          funcao: 'Gerente',
          ativo: 1,
          login_id:1,
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          nome: 'John Doe',
          data_nascimento: "1998-11-07",
          cpf: '965-964-964-55',
          endereco: 'Rua 3',
          funcao: 'Funcionario',
          ativo: 1,
          login_id:2,
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          nome: 'Jane Doe',
          data_nascimento: "1998-07-01",
          cpf: '123-456-789-00',
          endereco: 'Rua 4',
          funcao: 'Funcionario',
          ativo: 1,
          login_id:3,
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          nome: 'Bob Smith',
          data_nascimento: "1998-07-01",
          cpf: '987-654-321-00',
          endereco:'Rua 5',
          funcao:'Funcionario',
          ativo :1,
          login_id:4,
          createdAt : new Date(),
          updatedAt : new Date()
         },
         {
           nome :'Alice Brown',
           data_nascimento: "1998-07-01",
           cpf :'111-222-333-44' ,
           endereco :'Rua 6' ,
           funcao :'Funcionario' ,
           ativo :5,
           login_id:5,
           createdAt : new Date(),
           updatedAt : new Date()
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
