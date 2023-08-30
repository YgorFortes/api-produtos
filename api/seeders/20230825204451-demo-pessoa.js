'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert('Pessoas', [
        {
          nome: 'ygor',
          idade: 24,
          cpf: '547-986-854-96',
          email: 'ygor@gmail.com',
          endereco: 'rua 2',
          funcao: 'Gerente',
          ativo: 1,
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          nome: 'John Doe',
          idade: 24,
          cpf: '965-964-964-55',
          email: 'John@gmail.com',
          endereco: 'Rua 3',
          funcao: 'Gerente',
          ativo: 1,
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          nome: 'Jane Doe',
          idade: 32,
          cpf: '123-456-789-00',
          email: 'JJane@gmail.com',
          endereco: 'Rua 4',
          funcao: 'Funcionario',
          ativo: 1,
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          nome: 'Bob Smith',
          idade: 45,
          cpf: '987-654-321-00',
          email:'Bob@gmail.com',
          endereco:'Rua 5',
          funcao:'Funcionario',
          ativo :1,
          createdAt : new Date(),
          updatedAt : new Date()
         },
         {
           nome :'Alice Brown',
           idade :28,
           cpf :'111-222-333-44' ,
           email :'Alice@gmail.com' ,
           endereco :'Rua 6' ,
           funcao :'Funcionario' ,
           ativo :1 ,
           createdAt : new Date(),
           updatedAt : new Date()
         },
         {
           nome :'Charlie Green' ,
           idade :39 ,
           cpf :'444 -555 -666 -77' ,
           email :'Charlie@gmail.com' ,
           endereco :'Rua7' ,
           funcao :'Funcionario' ,
           ativo :1 ,
           createdAt : new Date(),
           updatedAt : new Date()
         },
         {
           nome :'Ronaldo' ,
           idade :55 ,
           cpf :'454 -565 -468 -63' ,
           email :'ROnaldo@gmail.com' ,
           endereco :'Rua show' ,
           funcao :'Estagiario' ,
           ativo :1 ,
           createdAt : new Date(),
           updatedAt : new Date()
         },
         {
            nome :'Larissa Fortes' ,
            idade :24 ,
            cpf :'444 -555 -666 -77' ,
            email :'larissa@gmail.com' ,
            endereco :'Rua9' ,
            funcao :'Funcionario' ,
            ativo :1 ,
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
