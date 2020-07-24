import Joi from 'joi';
import { objectId } from './custom';

export const createCity = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    no: Joi.number().integer(),
  }),
};

export const getCities = {
  query: Joi.object().keys({
    title: Joi.string(),
    no: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCity = {
  params: Joi.object().keys({
    cityId: Joi.string().custom(objectId),
  }),
};

export const updateCity = {
  params: Joi.object().keys({
    cityId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      no: Joi.number().integer(),
    })
    .min(1),
};

export const deleteCity = {
  params: Joi.object().keys({
    cityId: Joi.string().required().custom(objectId),
  }),
};
