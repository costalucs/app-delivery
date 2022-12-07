const { getSalesByToken } = require('../../services/sales');

async function getMySales(req, res, next) {
  try {
    const { headers: { authorization } } = req;
    const sales = await getSalesByToken(authorization);
    return res.status(200).json(sales);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMySales,
}
