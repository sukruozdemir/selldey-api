import httpStatus from 'http-status';

import { OrderStatus } from '../models';
import { ApiError } from '../utils/api-error';

/**
 * Query for order statuses
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryOrderStatuses = async (filter, options) => {
  const orderStatuses = await OrderStatus.paginate(filter, options);
  return orderStatuses;
};

/**
 * Create a order status
 *
 * @param {String}  title
 * @param {String}  color
 * @param {Boolean} active
 * @returns {Promise<OrderStatus>}
 */
export const createOrderStatus = async (title, color, active) => {
  if (await OrderStatus.isDuplicate(title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" sipariş durumu daha önce eklenmiş`);
  }

  const orderStatus = await OrderStatus.create({ title, color, active });
  return orderStatus;
};

/**
 * Update order status by id
 *
 * @param {ObjectId} orderStatusId
 * @param {String}   title
 * @param {String}   color
 * @param {Boolean}  active
 * @returns {Promise<OrderStatus>}
 */
export const updateOrderStatusById = async (orderStatusId, title, color, active) => {
  const orderStatus = await getOrderStatusById(orderStatusId);

  if (!orderStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sipariş durumu bulunamadı');
  }
  if (title && (await OrderStatus.isDuplicate(title))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `"${title}" sipariş durumu daha önce eklenmiş`);
  }

  Object.assign(orderStatus, {
    title,
    color,
    active,
  });

  await orderStatus.save();
  return orderStatus;
};

/**
 * Delete order status by id
 *
 * @param {ObjectId} orderStatusId
 * @returns {Promise<OrderStatus>}
 */
export const deleteOrderStatusById = async (orderStatusId) => {
  const orderStatus = await getOrderStatusById(orderStatusId);

  if (!orderStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sipariş durumu bulunamadı');
  }

  await orderStatus.remove();
  return orderStatus;
};

/**
 * Get order status by id
 *
 * @param {ObjectId} orderStatusId
 * @returns {Promise<OrderStatus>}
 */
export const getOrderStatusById = async (orderStatusId) => {
  return await OrderStatus.findById(orderStatusId);
};
