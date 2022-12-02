import * as yup from 'yup';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

export const loginSchema = yup.object({
  email: yup.string().email({ tlds: { allow: false } }).required(),
  password: yup.string().min(MIN_PASSWORD_LENGTH).required(),
});

export const registerSchema = yup.object({
  email: yup.string().email({ tlds: { allow: false } }).required(),
  password: yup.string().min(MIN_PASSWORD_LENGTH).required(),
  name: yup.string().min(MIN_NAME_LENGTH).required(),
});
