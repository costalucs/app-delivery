const UserService = require('../../services/users');
const { verify } = require('jsonwebtoken');

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
    const data = verify(authorization);
    if (data) {
      const user = await UserService.findById(data.id);
      return user;
    }
  } catch (e) {
    console.log('should treat errors');
  }
};

module.exports = { createUser, getMe };
