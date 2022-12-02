const { default: axios } = require('axios');

const getUserInfo = async (email, password) => {
  try {
    const { data } = await axios.post('http://localhost:3001/login', { email, password });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { getUserInfo };
