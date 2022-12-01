const { sign, verify } = require('jsonwebtoken');
const { encode } = require('../../utils/encode');
const UserService = require('../../services/users');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;
  const passwordMd5 = encode(password);
  const { dataValues: { id, role } } = await UserService.getOne(email, passwordMd5);

  if (!user) return res.status(404).json({ message: 'Not found' });

  const token = sign({ id, role }, jwtSecret);

  return res.status(200).json({ token });
};

module.exports = { login };
