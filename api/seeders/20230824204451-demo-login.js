'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Login', [
      {
        email: "ygor1888@gmail.com",
        senha: "45431820",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        email: "Foundation@gmail.com",
        senha: "IsaacAsimov",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        email: "1984@gmail.com",
        senha: "GeorgeOrwell",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        email: "Ender@gmail.com",
        senha: "OrsonScottCard",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        email: "The@gmail.com",
        senha: "DouglasAdams",
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
