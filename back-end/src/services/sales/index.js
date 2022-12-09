const { sales, salesProducts } = require('../../database/models');
const { HttpException } = require('../../shared/error');
const { findByToken } = require('../users');

async function getSalesByToken(token) {
  const user = await findByToken(token);
  const column = user.role === 'seller' ? 'sellerId' : 'userId';
  return sales.findAll({
    where: { [column]: user.id },
    attributes: { exclude: ['sellerId', 'userId'] },
    include: [
      {
        association: 'products',
        attributes: ['name', 'price', 'id'],
        through: { attributes: ['quantity'] },
      },
      { association: 'user', attributes: ['name', 'id'] },
      { association: 'seller', attributes: ['name', 'id'] },
    ],
  });
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

const updateSale = async (orderId, userId, newStatus) => {
  const { dataValues: order } = await sales.findByPk(orderId);
  if (order.sellerId === userId) {
    if (newStatus === 'Preparando' || newStatus === 'Em Trânsito') {
      const updated = await sales.update({ status: newStatus }, { where: { id: orderId } });
      console.log(updated);
      return updated;
    }
    throw new HttpException(400, 'Update not allowed based on user\'s role');
  }
  if (newStatus === 'Entregue') {
    const updated = await sales.update({ status: newStatus }, { where: { id: orderId } });
    console.log(updated);
    return updated;
  }
  throw new HttpException(400, 'Update not allowed based on user\'s role');
};

module.exports = { getSalesByToken, createSale, updateSale };
