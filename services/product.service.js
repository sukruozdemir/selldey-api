import httpStatus from 'http-status';

import { Product } from './../models';
import { ApiError } from './../utils/api-error';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createProduct = async (product) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};
