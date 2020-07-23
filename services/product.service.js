import httpStatus from 'http-status';

import { Product } from '../models';
import { ApiError } from '../utils/api-error';

/**
 * Create a product
 *
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
export const createProduct = async (productBody) => {
  if (await Product.isTitleDuplicate(productBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${productBody.title}" ürünü daha önce eklenmiş`);
  } else if (await Product.isSiteDuplicate(productBody.site)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${productBody.site}" sitesi başka ürüne daha önce eklenmiş`);
  }

  const product = await Product.create(productBody);
  return product;
};

/**
 * Query for products
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Update product by id
 *
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
export const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ürün bulunamadı');
  }

  if (updateBody.title && (await Product.isTitleDuplicate(updateBody.title))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${productBody.title}" ürünü daha önce eklenmiş`);
  } else if (updateBody.site && (await Product.isSiteDuplicate(updateBody.site))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${productBody.site}" sitesi başka ürüne daha önce eklenmiş`);
  }

  Object.assign(product, updateBody);

  await product.save();
  return product;
};

/**
 * Delete product by id
 *
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
export const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ürün bulunamadı');
  }

  await product.remove();
  return product;
};

/**
 * Add price to product by id
 *
 * @param {ObjectId} productId
 */
export const addProductPriceById = async (productId, price, quantity) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ürün bulunamadı');
  }

  product.prices.push({ price, quantity });
  await product.save();
  return product;
};

/**
 * Remove price from product by id
 *
 * @param {ObjectId} productId
 * @param {String}   priceId
 */
export const removeProductPriceById = async (productId, priceId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ürün bulunamadı');
  }

  product.prices.remove({ _id: priceId });
  await product.save();
  return product;
};

/**
 * Get product by id
 *
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
export const getProductById = async (productId) => {
  return Product.findById(productId);
};
