import httpStatus from 'http-status';

import { City } from '../models';
import { ApiError } from '../utils/api-error';

/**
 * Query for cities
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryCities = async (filter, options) => {
  const cities = await City.paginate(filter, options);
  return cities;
};

/**
 * Create a city
 *
 * @param {String}  title
 * @param {Number}  no
 * @returns {Promise<City>}
 */
export const createCity = async (title, no) => {
  if (await City.isDuplicate(title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" şehri daha önce eklenmiş`);
  }

  const city = await City.create({ title, no });
  return city;
};

/**
 * Update city by id
 *
 * @param {ObjectId} cityId
 * @param {String}   title
 * @param {Number}   no
 * @returns {Promise<City>}
 */
export const updatecityById = async (cityId, title, no) => {
  const city = await getcityById(cityId);

  if (!city) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Şehir bulunamadı');
  }
  if (title && (await City.isDuplicate(title))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" şehri daha önce eklenmiş`);
  }

  Object.assign(city, {
    title,
    no,
  });

  await City.save();
  return city;
};

/**
 * Delete city by id
 *
 * @param {ObjectId} cityId
 * @returns {Promise<City>}
 */
export const deletecityById = async (cityId) => {
  const city = await getcityById(cityId);

  if (!city) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Şehir bulunamadı');
  }

  await City.remove();
  return city;
};

/**
 * Get city by id
 *
 * @param {ObjectId} cityId
 * @returns {Promise<City>}
 */
export const getcityById = async (cityId) => {
  return await City.findById(cityId);
};
