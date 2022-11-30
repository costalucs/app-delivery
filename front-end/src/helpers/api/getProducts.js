const { default: axios } = require('axios');

const getProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/products');
  return data;
};

module.exports = { getProducts };
