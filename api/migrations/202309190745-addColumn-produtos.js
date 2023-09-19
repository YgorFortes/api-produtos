'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Produtos', 'quantidade',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
  );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('quantidade');
  }
};