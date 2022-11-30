const express = require('express');
const loginController = require('../controller/login/index')
const productsController = require('../controller/products');
const userController = require('../controller/user')
const { validateLogin } = require('../middleware/validations/validateLogin');

const app = express();

const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.static(`public`));

app.get('/products', productsController.getAll)
app.post('/login', validateLogin, loginController.login)
app.post('/create', userController.createUser)

module.exports = app;