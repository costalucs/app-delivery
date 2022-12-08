import api from '.';

export const getMyOrders = async (token) => {
  const orders = await api.get(
    '/customers/orders',
    { headers: { authorization: token } },
  );
  console.log(orders);
  return orders.data;
};

export const getMySales = async (token) => {
  const sales = await api.get('/seller/orders', { headers: { authorization: token } });
  console.log(sales);
  return sales.data;
};
