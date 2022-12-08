import api from '.';

export const createSale = async (datas, token) => {
  const { data } = await api
    .post('/create/sale', datas, { headers: { authorization: token } });
  return data;
};

export const dummySale = () => {
  console.log(
    'estou aqui esperando novas funções de produtos para o lint não pedir export default',
  );
};
