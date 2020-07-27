import Joi from 'joi';
import { objectId } from './custom';

export const createOrder = {
  body: Joi.object().keys({
    customerName: Joi.string().required().trim(),
    phoneNumber: Joi.string().required(),
    quantity: Joi.number().integer().default(1),
    address: Joi.string().required(),
    paymentType: Joi.string().valid('KAPIDA_KREDI_KARTI', 'KAPIDA_NAKIT_ODEME').required(),
    orderNote: Joi.string(),
    ordered: Joi.date().required(),
    city: Joi.string().custom(objectId).required(),
    province: Joi.string().custom(objectId).required(),
    product: Joi.string().custom(objectId).required(),
    status: Joi.string().custom(objectId).required(),
  }),
};
