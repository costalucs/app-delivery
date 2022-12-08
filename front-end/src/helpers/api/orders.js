import api from '.';

export default async function getMyOrders(token) {
  const orders = await api.get(
    '/orders',
    { headers: { authorization: token } },
  );
  console.log(orders);
  return orders.data;
}
