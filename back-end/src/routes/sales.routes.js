const { Router } = require('express');
const { validateToken } = require('../shared/middleware/auth');

const { getMySales } = require('../controller/sales'); 

const sales = Router();

sales.use(validateToken);

sales.get('/orders', getMySales);

module.exports = {
  sales,
};
