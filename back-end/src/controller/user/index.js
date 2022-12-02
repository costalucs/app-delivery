const { verify } = require('jsonwebtoken');
const UserService = require('../../services/users');

const createUser = async (req, res) => {
  try {
    const newUser = await UserService.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ message: 'Token required' });
    const { id } = verify(authorization, process.env.JWT_SECRET || 'json_token_secret');
    const { dataValues } = await UserService.findById(id);
    return res.status(200).json(dataValues);
  } catch (e) {
    console.log('should treat errors', e);
    return { message: e.message };
  }
};

module.exports = { createUser, getMe };
