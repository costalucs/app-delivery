const joiValidate = require('../../../joivalidation/joiSchemas');
const userServices = require('../../../services/users');
const { HttpException } = require('../../error');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const isValid = joiValidate.loginSchema.validate({ email, password });
  if (isValid.error) return res.status(404).json({ message: isValid.error.message });
  next();
};

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await userServices.verifySession(authorization);
    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = { validateLogin };
