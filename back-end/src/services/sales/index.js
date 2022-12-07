const Models = require('../../database/models');
const { findByToken } = require('../users');

async function getSalesByToken(token) {
  const { id } = await findByToken(token);
  const { dataValues } = await Models.sales.findAll({
    where: {
      sellerId: id,
    },
  });
  return dataValues;
}

module.exports = {
  getSalesByToken,
};
