import Joi from 'joi';
import { objectId } from './custom';

export const createProvince = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    city: Joi.string().required().custom(objectId),
  }),
};

export const getProvinces = {
  query: Joi.object().keys({
    title: Joi.string(),
    city: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProvince = {
  params: Joi.object().keys({
    provinceId: Joi.string().custom(objectId),
  }),
};

export const updateProvince = {
  params: Joi.object().keys({
    provinceId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      city: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteProvince = {
  params: Joi.object().keys({
    provinceId: Joi.string().required().custom(objectId),
  }),
};
