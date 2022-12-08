const { verify } = require('jsonwebtoken');
const fs = require('fs');
const joiValidate = require('../../../joivalidation/joiSchemas');

const jwtSecret = fs.readFileSync(`${__dirname}/../../../../jwt.evaluation.key`, 'utf-8');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const isValid = joiValidate.loginSchema.validate({ email, password });
  if (isValid.error) return res.status(404).json({ message: isValid.error.message });
  next();
};

const validateToken = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    const decoded = verify(authorization, jwtSecret);

    req.user = { ...decoded };
    next();
  } catch (e) {
    return next(e);
  }
};

module.exports = { validateLogin, validateToken };
