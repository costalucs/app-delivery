const UserService = require('../../services/users');
const { HttpException } = require('../../shared/error');

const createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) throw new HttpException(400, 'Missing required fields');
    const newUser = await UserService.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ message: 'Token required' });

    const user = await UserService.findByToken(authorization);

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const getSellers = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Token required' });

    const sellers = await UserService.getSellers(authorization);

    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getMe, getSellers };
