'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'sales'},
        allowNull: false,
        onDelete: "CASCADE",
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { key: 'id', model: 'products'},
        allowNull: false,
        onDelete: "CASCADE",
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('salesProducts');
  }
};
