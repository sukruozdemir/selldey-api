import joi from 'joi';
import { password } from './custom';

export const register = {
  body: joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().required().custom(password),
    name: joi.string().required(),
  }),
};

export const login = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};

export const refreshTokens = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};

export const forgotPassword = {
  body: joi.object().keys({
    email: joi.string().email().required(),
  }),
};

export const resetPassword = {
  query: joi.object().keys({
    token: joi.string().required(),
  }),
  body: joi.object().keys({
    password: joi.string().required().custom(password),
  }),
};
