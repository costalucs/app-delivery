import api from '.';
import { loginSchema, registerSchema } from '../validations/credentials';

export const login = async (credentials) => {
  try {
    const { error } = loginSchema.validate(credentials);
    if (error) throw error;
    const { data: { token } } = await api.post('login', credentials);
    return token;
  } catch (e) {
    alert(e.message);
  }
};

export const getMe = async (token) => {
  try {
    const { data } = await api.get('/me', { headers: { authorization: { token } } });
    return data;
  } catch (e) {
    alert(e.message);
    return e;
  }
};

export const registerUser = async (user) => {
  try {
    const { error } = registerSchema.validate(user);
    if (error) throw error;
    return await api.post('/create', user);
  } catch (err) {
    alert(err.message);
  }
};
