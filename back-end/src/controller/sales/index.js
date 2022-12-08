const SalesServices = require('../../services/sales');

const createSale = async (req, res, next) => {
  const userid = req.user.id;
  const { sale, productsList } = req.body;
  try {
    const newSale = await SalesServices.createSale(sale, userid, productsList);
    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

module.exports = { createSale };