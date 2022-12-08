const { sales, salesProducts } = require('../../database/models');
const { findByToken } = require('../users');

async function getSalesByToken(token) {
  const user = await findByToken(token);
  const column = user.role === 'seller' ? 'sellerId' : 'userId';
  const test = await sales.findAll({
    where: {
      [column]: user.id,
    },
    include: [{
      association: 'products',
      attributes: ['name', 'price'],
      through: { attributes: ['quantity'] },
    }],
  });
  return test;
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

module.exports = { getSalesByToken, createSale };
