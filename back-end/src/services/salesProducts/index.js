const { salesProducts } = require('../../database/models');

const createSalesProducts = async (productsList) => {
  const newSalesProducts = await salesProducts.bulkCreate(productsList);
  return newSalesProducts;
};

module.exports = { createSalesProducts };