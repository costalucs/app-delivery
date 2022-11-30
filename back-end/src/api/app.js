const express = require('express');
const loginController = require('../controller/login/index')
const productsController = require('../controller/products');
const userController = require('../controller/user')
const { validateLogin } = require('../middleware/validations/validateLogin');
const cors = require('cors')
const corsOptions ={
  origin:'http://localhost:3000', 
  methods: ['GET', 'POST'],
}

const app = express();

app.use(cors(corsOptions))
app.use(express.json());


app.get('/products', productsController.getAll)
app.post('/login', validateLogin, loginController.login)
app.post('/create', userController.createUser)
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
