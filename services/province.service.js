import httpStatus from 'http-status';

import { Province } from '../models';
import { ApiError } from '../utils/api-error';

/**
 * Query for provinces
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryProvices = async (filter, options) => {
  const provinces = await Province.paginate(filter, options);
  return provinces;
};

/**
 * Create a province
 *
 * @param {String}   title
 * @param {ObjectId} city
 * @returns {Promise<Province>}
 */
export const createProvince = async (title, city) => {
  if (await Province.isDuplicate(title, city)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" ilçesi daha önce eklenmiş`);
  }

  const province = await Province.create({ title, city });
  return province;
};

/**
 * Update province by id
 *
 * @param {ObjectId} provinceId
 * @param {String}   title
 * @param {ObjectId} city
 * @returns {Promise<Province>}
 */
export const updateProvinceById = async (provinceId, title, city) => {
  const province = await getProvinceById(provinceId);

  if (!province) {
    throw new ApiError(httpStatus.NOT_FOUND, 'İlçe bulunamadı');
  }
  if (title && (await Province.isDuplicate(title, city))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" ilçesi daha önce eklenmiş`);
  }

  Object.assign(province, {
    title,
    city,
  });

  await Province.save();
  return province;
};

/**
 * Delete province by id
 *
 * @param {ObjectId} provinceId
 * @returns {Promise<Province>}
 */
export const deleteProvinceById = async (provinceId) => {
  const province = await getProvinceById(provinceId);

  if (!province) {
    throw new ApiError(httpStatus.NOT_FOUND, 'İlçe bulunamadı');
  }

  await Province.remove();
  return province;
};

/**
 * Get province by id
 *
 * @param {ObjectId} provinceId
 * @returns {Promise<Province>}
 */
export const getProvinceById = async (provinceId) => {
  return await Province.findById(provinceId);
};
