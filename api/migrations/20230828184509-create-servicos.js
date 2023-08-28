'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Servicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_entrega: {
        allowNull: false,
        type: Sequelize.DATE
      },
      preco: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      pessoa_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Pessoas', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Servicos');
  }
};