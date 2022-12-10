const {
  getSalesByToken,
  createSale: newSaleService,
  updateSale: updateSaleService,
} = require('../../services/sales');

async function getMySales(req, res, next) {
  try {
    const { headers: { authorization } } = req;
    const sales = await getSalesByToken(authorization);
    return res.status(200).json(sales);
  } catch (e) {
    next(e);
  }
}

const createSale = async (req, res, next) => {
  const userid = req.user.id;
  const { sale, productsList } = req.body;
  try {
    const newSale = await newSaleService(sale, userid, productsList);
    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const confirm = await updateSaleService(orderId, status);
    return res.status(201).json(confirm);
  } catch (e) {
    next(e);
  }
};

module.exports = { getMySales, createSale, updateSale };
