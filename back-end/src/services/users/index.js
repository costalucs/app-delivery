const { Op } = require('sequelize');
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

const findById = async (id) => {
  const user = await model.users.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const create = async ({ name, email, password, role }) => {
  const user = await model.users.create({ name, email, password, role });
  return user;
};

module.exports = { getAll, getOne, create, findById };
