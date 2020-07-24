import Joi from 'joi';
import { objectId } from './custom';

export const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    description: Joi.string(),
    site: Joi.string().required().uri(),
    category: Joi.string().custom(objectId),
    active: Joi.boolean().default(true),
  }),
};

export const getProducts = {
  query: Joi.object().keys({
    title: Joi.string(),
    site: Joi.string(),
    category: Joi.string().custom(objectId),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      site: Joi.string().uri(),
      category: Joi.string().custom(objectId),
      active: Joi.boolean(),
    })
    .min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const addPrice = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    price: Joi.number(),
    quantity: Joi.number().integer(),
  }),
};

export const removePrice = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    priceId: Joi.string(),
  }),
};

export const uploadCoverImage = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
