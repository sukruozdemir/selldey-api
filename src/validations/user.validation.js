import Joi from 'joi';
import { objectId, password } from './custom';

import UserRole from '../enumerations/user-role';

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    role: Joi.string()
      .required()
      .valid(...Object.values(UserRole)),
  }),
};
