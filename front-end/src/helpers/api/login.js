const { default: axios } = require('axios');
const { loginSchema } = require('../validations/credentials');

const getUserInfo = async (email, password) => {
  try {
    const { error } = loginSchema.validate({ email, password });
    if (error) throw error;
    const { data } = await axios.post('http://localhost:3001/login', { email, password });
    return data;
  } catch (e) {
    alert(e.message);
  }
};

module.exports = { getUserInfo };
