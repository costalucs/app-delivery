const { default: axios } = require('axios');

const getUserInfo = async (email, password) => {
  const { data } = await axios.post('http://localhost:3001/login', { email, password });
  return data;
};

module.exports = { getUserInfo };
