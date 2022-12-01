const { default: axios } = require('axios');
const { registerSchema } = require('../validations/credentials');

const registerUser = async (user) => {
  try {
    const { error } = registerSchema.validate(user);
    if (error) throw error;
    return await axios.post('/create', user);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { registerUser };
