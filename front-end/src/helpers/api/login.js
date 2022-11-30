const { default: axios } = require('axios');

axios.defaults.baseURL = 'localhost:3001';

const getUserInfo = (email, password) => axios.post('/login', { email, password })
  .then((response) => (response))
  .catch((error) => {
    console.log(error);
  });

module.exports = { getUserInfo };
