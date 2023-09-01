'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Produtos', [
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Mavic Ksyrium Elite",
        marca: "Mavic",   
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Zipp 404 Firecrest",
        marca: "Zipp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Shimano Dura-Ace",
        marca: "Shimano",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "HED Jet 6 Plus",
        marca: "HED",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Enve SES 3.4",
        marca: "Enve",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Shimano Ultegra",
        marca: "Shimano",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Campagnolo Bora Ultra Two",
        marca: "Campagnolo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Reynolds Assault SLG Carbon Clincher Wheelset",
        marca: "Reynolds",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome:"Roda", 
        valor :35.95, 
        modelo:"Fulcrum Racing Zero Carbon", 
        marca:"Fulcrum", 
        createdAt :new Date(), 
        updatedAt :new Date()
       },
       {
        nome:"Roda", 
        valor :35.95, 
        modelo:"DT Swiss PR1600 Spline", 
        marca:"DT Swiss", 
        createdAt :new Date(), 
        updatedAt :new Date()
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
