import api from '.';
import { loginSchema, registerSchema } from '../validations/credentials';

export const login = async (credentials) => {
  const { error } = loginSchema.validate(credentials);
  if (error) throw error;
  const { data: { token } } = await api.post('login', credentials);
  return token;
};

export const getMe = async (token) => {
  const { data } = await api.get('/me', { headers: { authorization: token } });
  return data;
};

export const registerUser = async (user) => {
  const { error } = registerSchema.validate(user);
  if (error) throw error;
  return api.post('/create', user);
};

export const getSellers = async (token) => {
  const { data } = await api.get('/get/sellers', { headers: { authorization: token } });
  return data;
};
