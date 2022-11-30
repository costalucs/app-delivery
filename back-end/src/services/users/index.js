const model = require('../../database/models')
const { Op } = require("sequelize");

const getAll = async () => {
  const allProducts = await model.users.findAll()
  return allProducts
}

const getOne = async (email, password) => {
  const user = await model.users.findOne({
    where: {
      [Op.and]: [
        { email }, { password }
      ]
    }
  })
  return user
}

const create = async ({ name, email, password, role }) => {
  const user = await model.users.create({ name, email, password, role })
  return user;
}

module.exports = { getAll, getOne, create }