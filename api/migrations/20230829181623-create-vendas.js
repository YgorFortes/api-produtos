'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_pagamento: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_entrega: {
        type: Sequelize.DATEONLY
      },
      data_venda: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Vendas');
  }
};