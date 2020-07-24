import httpStatus from 'http-status';

import { Category } from '../models';
import { ApiError } from '../utils/api-error';

/**
 * Query for categories
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

/**
 * Create a category
 *
 * @param {String} title
 * @param {Boolean} active
 * @returns {Promise<Category>}
 */
export const createCategory = async (title, active) => {
  if (await Category.isDuplicate(title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" kategorisi daha önce eklenmiş`);
  }

  const category = await Category.create({ title, active });
  return category;
};

/**
 * Update category by id
 *
 * @param {ObjectId} categoryId
 * @param {String} title
 * @param {Boolean} active
 * @returns {Promise<Category>}
 */
export const updateCategoryById = async (categoryId, title, active) => {
  const category = await getCategoryById(categoryId);

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kategori bulunamadı');
  }
  if (title && (await Category.isDuplicate(title))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  Object.assign(category, {
    title,
    active,
  });

  await category.save();
  return category;
};

/**
 * Delete category by id
 *
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
export const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kategori bulunamadı');
  }

  await category.remove();
  return category;
};

/**
 * Get category by id
 *
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
export const getCategoryById = async (id) => {
  return await Category.findById(id);
};
