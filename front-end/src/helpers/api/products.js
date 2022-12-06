import api from '.';

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const dummy = () => {
  console.log(
    'estou aqui esperando novas funções de produtos para o lint não pedir export default',
  );
};
