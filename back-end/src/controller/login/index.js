const { sign } = require('jsonwebtoken');
const { encode } = require('../../utils/encode');
const UserService = require('../../services/users');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'json_token_secret';

const login = async (req, res) => {
  const { email, password } = req.body;
  const passwordMd5 = encode(password);
  const user = await UserService.getOne(email, passwordMd5);

  if (!user.id) return res.status(404).json({ message: 'Not found' });

  const token = sign(user, jwtSecret);

  return res.status(200).json({ token });
};

module.exports = { login };
