const { default: axios } = require('axios');

const registerUser = async ({ name, email, password }) => {
  try {
    const us = await axios.post('http://localhost:3001/create', { name, email, password });
    return us;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { registerUser };
