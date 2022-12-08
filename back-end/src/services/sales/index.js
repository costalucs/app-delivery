const Models = require('../../database/models');
const { findByToken } = require('../users');

async function getSalesByToken(token) {
  const { id, role } = await findByToken(token);
  if (role === 'seller') {
    const { dataValues } = await Models.sales.findAll({
      where: {
        sellerId: id,
      },
    });
    return dataValues;
  }
  const { dataValues } = await Models.sales.findAll({
    where: {
      customerId: id,
    },
  });
  return dataValues;
}

module.exports = {
  getSalesByToken,
};
