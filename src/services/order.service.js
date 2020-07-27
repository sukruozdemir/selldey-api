import httpStatus from 'http-status';

import { Order } from '../models';
import { ApiError } from '../utils/api-error';

/**
 * Query for orders
 *
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
export const queryOrders = async (filter, options) => {
  const orders = await orders.paginate(filter, options);
  return orders;
};

/**
 * Create a order
 *
 * @param {String}   customerName
 * @param {String}   phoneNumber
 * @param {Number}   quantity
 * @param {String}   address
 * @param {String}   paymentType
 * @param {String}   orderNote
 * @param {Date}     ordered
 * @param {ObjectId} city
 * @param {ObjectId} province
 * @param {ObjectId} product
 * @param {ObjectId} status
 *
 * @returns {Promise<Order>}
 */
export const createOrder = async (orderBody) => {
  const order = await Order.create(orderBody);
  return order;
};
