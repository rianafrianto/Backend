'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'price', {
      type: Sequelize.DECIMAL(10, 0),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  }
};
