const { Router } = require('express');
const { validateToken } = require('../shared/middleware/auth');

const { getMySales } = require('../controller/sales'); 

const seller = Router();

seller.use(validateToken);

seller.get('/orders', getMySales);

module.exports = {
  seller,
}
