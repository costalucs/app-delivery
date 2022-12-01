import joi from 'joi';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

export const loginSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required(),
  password: joi.string().min(MIN_PASSWORD_LENGTH).required(),
});

export const registerSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required(),
  password: joi.string().min(MIN_PASSWORD_LENGTH).required(),
  name: joi.string().min(MIN_NAME_LENGTH).required(),
});
