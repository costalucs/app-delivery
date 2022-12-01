import api from '.';
import { loginSchema, registerSchema } from '../validations/credentials';

export const login = async (email, password) => {
  try {
    const { error } = loginSchema.validate({ email, password });
    if (error) throw error;
    const { data } = await api.post('/login', { email, password });
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const getMe = async (token) => {
  try {
    const user = await api.get('/me', {}, { headers: { authorization: { token } } });
    return user;
  } catch (e) {
    alert(e.message);
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
