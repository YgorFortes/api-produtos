'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Vendas', [
      {
        data_pagamento: new Date(2023, 0, 1),
        data_entrega: new Date(2023, 0, 2),
        data_venda: new Date(2023, 0, 3),
        pessoa_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        data_pagamento: new Date(2023, 1, 2),
        data_entrega: new Date(2023, 1, 3),
        data_venda: new Date(2023, 1, 4),
        pessoa_id: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        data_pagamento: new Date(2023, 2, 3),
        data_entrega: new Date(2023, 2, 4),
        data_venda: new Date(2023, 2, 5),
        pessoa_id: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        data_pagamento: new Date(2023, 3, 4),
        data_entrega: new Date(2023, 3, 5),
        data_venda: new Date(2023, 3, 6),
        pessoa_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
       {
        data_pagamento: new Date(2023,4,5),
        data_entrega: new Date(2023,4,6),
        data_venda: new Date(2023,4,7),
        pessoa_id:3,
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
