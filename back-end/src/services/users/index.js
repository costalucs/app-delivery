const { Op } = require('sequelize');
const md5 = require('md5');
const model = require('../../database/models');

const getAll = async () => {
  const allProducts = await model.users.findAll();
  return allProducts;
};

const getOne = async (email, password) => {
  const user = await model.users.findOne({
    where: { [Op.and]: [{ email }, { password }] },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const create = async ({ name, email, password, role }) => {
  const md5password = md5(password);
  const user = await model.users.create({ name, email, password: md5password, role });
  return user;
};

module.exports = { getAll, getOne, create };