const { sales, salesProducts } = require('../../database/models');

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