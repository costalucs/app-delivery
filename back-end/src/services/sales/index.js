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
      userId: id,
    },
    // include: 'products',
  });
  return dataValues;
}

module.exports = {
  getSalesByToken,
};
