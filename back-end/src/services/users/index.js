const { Op } = require('sequelize');
const { encode } = require('../../utils/encode')

const { sign, verify } = require('jsonwebtoken');
const fs = require('fs');
const md5 = require('md5');

const model = require('../../database/models');

const { HttpException } = require('../../shared/error');

const jwtSecret = fs.readFileSync(`${__dirname}/../../../jwt.evaluation.key`, 'utf-8')
.trim();

const getAll = async () => {
  const allProducts = await model.users.findAll();
  return allProducts;
};

const login = async (email, password) => {
  const passwordMd5 = encode(password);
  const user = await model.users.findOne({
    where: { [Op.and]: [{ email }, { password: passwordMd5 }] },
    // attributes: { exclude: ['password'] },
  });
  if (!user) throw new HttpException(404, 'User not found');

  return sign(user.dataValues, jwtSecret);
};

const create = async ({ name, email, password, role }) => {
  const md5password = md5(password);
  const user = await model.users.create({ name, email, password: md5password, role: role || 'customer' });
  if (!user) throw new HttpException(409, 'Invalid new user');
  return { token: sign({ id: user.id, name: user.name, role: user.role }, jwtSecret) };
};

const findByToken = async (token) => {
  const { id } = verify(token, jwtSecret);
  if (!id) throw new HttpException(400, 'Need valid credentials');
  const { dataValues } = await model.users.findByPk(id, { attributes: { exclude: ['password'] } });
  return dataValues;
};

module.exports = { getAll, login, create, findByToken };
