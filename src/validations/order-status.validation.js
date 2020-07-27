import Joi from 'joi';
import { objectId } from './custom';

export const createOrderStatus = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    color: Joi.string().required().trim(),
    active: Joi.boolean().default(true),
  }),
};

export const getOrderStatuses = {
  query: Joi.object().keys({
    title: Joi.string(),
    color: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().custom(objectId),
  }),
};

export const updateOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required().trim(),
      color: Joi.string().required().trim(),
      active: Joi.boolean().default(true),
      no: Joi.number().integer(),
    })
    .min(1),
};

export const deleteOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().required().custom(objectId),
  }),
};
