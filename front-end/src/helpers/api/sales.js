import api from '.';
import formatDate from '../formatDate';

export const createSale = async (datas, token) => {
  const { data } = await api.post('/create/sale', datas, {
    headers: { authorization: token },
  });
  return data;
};

export async function getMyOrders(token) {
  const { data } = await api.get('/orders', {
    headers: { authorization: token },
  });
  return data.map((order) => {
    const {
      saleDate,
      deliveryAddress,
      deliveryNumber,
      products,
    } = order;
    return {
      ...order,
      saleDate: formatDate(saleDate),
      address: `${deliveryAddress}, ${deliveryNumber}`,
      products: products.map((prod) => ({
        name: prod.name,
        price: prod.price,
        quantity: prod.salesProducts.quantity,
      })),
    };
  });
}
