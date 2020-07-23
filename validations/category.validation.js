import Joi from 'joi';
import { objectId } from './custom';

export const createCategory = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    active: Joi.boolean().default(true),
  }),
};

export const getCategories = {
  query: Joi.object().keys({
    title: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

export const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      active: Joi.boolean(),
    })
    .min(1),
};

export const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};
