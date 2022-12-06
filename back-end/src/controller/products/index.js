const productsService = require('../../services/products');

const getAll = async (_req, res, next) => {
  try {
    // nop treat request, just request service and respond
    const allProducts = await productsService.getAll();
    return res.status(200).json(allProducts);
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll };
