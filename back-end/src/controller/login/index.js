const { sign } = require('jsonwebtoken');
const fs = require('fs');
const { encode } = require('../../utils/encode');
const UserService = require('../../services/users');


const jwtSecret = fs.readFileSync(`${__dirname}/../../../jwt.evaluation.key`, 'utf-8')
.trim();

const login = async (req, res) => {
  console.log(jwtSecret);
  const { email, password } = req.body;
  const passwordMd5 = encode(password);
  const user = await UserService.getOne(email, passwordMd5);

  if (!user) return res.status(404).json({ message: 'Not found' });

  const token = sign(user.dataValues, jwtSecret);

  return res.status(200).json({ ...user.dataValues, token });
};

module.exports = { login };
