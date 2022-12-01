const joiValidate = require('../../joivalidation/joiSchemas');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const isValid = joiValidate.loginSchema.validate({ email, password });
  if (isValid.error) return res.status(404).json({ message: isValid.error.message });
  next();
};

module.exports = { validateLogin };