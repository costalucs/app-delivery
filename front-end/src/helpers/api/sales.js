import api from '.';

export const getMySales = async (token) => {
  const sales = await api.get('/seller/orders', { headers: { authorization: token } });
  console.log(sales);
  return sales.data;
};

export const dummy = () => null;
