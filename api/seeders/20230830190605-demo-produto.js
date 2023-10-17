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
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Freio",
        valor: 35.95,
        modelo: "Zipp 404 Firecrest",
        marca: "Zipp",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Corrente",
        valor: 35.95,
        modelo: "Shimano Dura-Ace",
        marca: "Shimano",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Aro",
        valor: 35.95,
        modelo: "HED Jet 6 Plus",
        marca: "HED",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Buzina",
        valor: 35.95,
        modelo: "Enve SES 3.4",
        marca: "Enve",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Roda",
        valor: 35.95,
        modelo: "Shimano Ultegra",
        marca: "Shimano",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Pedal",
        valor: 35.95,
        modelo: "Campagnolo Bora Ultra Two",
        marca: "Campagnolo",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Quidon",
        valor: 35.95,
        modelo: "Reynolds Assault SLG Carbon Clincher Wheelset",
        marca: "Reynolds",
        quantidade: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome:"Retrovisor", 
        valor :35.95, 
        modelo:"Fulcrum Racing Zero Carbon", 
        marca:"Fulcrum", 
        quantidade: 10,
        createdAt :new Date(), 
        updatedAt :new Date()
       },
       {
        nome:"Moto", 
        valor :35.95, 
        modelo:"DT Swiss PR1600 Spline", 
        marca:"DT Swiss", 
        quantidade: 10,
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
