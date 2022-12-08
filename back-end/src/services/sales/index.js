const Models = require('../../database/models');
const { sales, salesProducts } = require('../../database/models');
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

const createSale = async ({ sellerId, deliveryAddress, deliveryNumber, totalPrice },
  userId, productsList) => {
  const newSale = await sales.create({
    userId,
    sellerId,
    deliveryAddress,
    totalPrice,
    deliveryNumber,
  });

  const newProductList = productsList.map(({ id, quantity }) => ({
    productId: id,
    saleId: newSale.id,
    quantity,
  }));

  await salesProducts.bulkCreate(newProductList);
  return newSale;
};

module.exports = { createSale };
