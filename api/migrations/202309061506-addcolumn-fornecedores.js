'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Fornecedores', 'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
  );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('deletedAt');
  }
};