const express = require('express');
const cors = require('cors');

const loginController = require('../controller/login/index');
const productsController = require('../controller/products');
const userController = require('../controller/user');
const sellsController = require('../controller/sales');

const { validateLogin, validateToken } = require('../shared/middleware/auth');
const { errorMiddleware } = require('../shared/middleware/error');

const { getMySales } = require('../controller/sales');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/products', productsController.getAll);
app.post('/login', validateLogin, loginController.login);
app.post('/create', userController.createUser);
app.post('/create/sale', validateToken, sellsController.createSale);
app.get('/me', userController.getMe);
app.get('/get/sellers', userController.getSellers);

app.get('/orders', getMySales);

app.use(errorMiddleware);

module.exports = app;
