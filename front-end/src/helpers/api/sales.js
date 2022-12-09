import api from '.';
import formatDate from '../mappers&formatters/formatDate';
import formatPrice from '../mappers&formatters/formatPrice';

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
      totalPrice,
    } = order;
    return {
      ...order,
      saleDate: formatDate(saleDate),
      address: `${deliveryAddress}, ${deliveryNumber}`,
      products: products.map((prod) => ({
        name: prod.name,
        price: prod.price,
        quantity: prod.salesProducts.quantity,
        id: prod.id,
      })),
      totalPrice: formatPrice(Number(totalPrice)),
    };
  });
}

export async function handleUpdate(orderId, userToken, newStatus) {
  await api.put(
    '/orders/update',
    {
      headers: { authorization: userToken },
      body: { orderId, status: newStatus },
    },
  );
}
