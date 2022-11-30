const { default: axios } = require('axios');

const getProducts = async () => axios.get('/products');

module.exports = { getProducts };
