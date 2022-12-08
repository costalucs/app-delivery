const { getSalesByToken, createSale } = require('../../services/sales');

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
    const newSale = await createSale(sale, userid, productsList);
    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMySales, createSale };
