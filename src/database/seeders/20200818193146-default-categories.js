'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        description: "Culinaria Brasileira",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: "Culinaria Japonêsa",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: "Culinaria Coreana",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
