const model = require('../../database/models');

const getAll = async () => {
  const allProducts = await model.products.findAll();
  return allProducts;
};

module.exports = { getAll };