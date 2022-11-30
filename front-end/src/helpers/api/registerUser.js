const { default: axios } = require('axios');

const registerUser = async (user) => {
  try {
    return await axios.post('/create', user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser };
