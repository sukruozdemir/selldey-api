import httpStatus from 'http-status';

import { catchAsync } from '../utils/catch-async';
import { pick } from '../utils/pick';
import { OrderStatus as orderStatusService } from '../services';

export const createOrderStatus = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.createOrderStatus(req.body.title, req.body.color, req.body.active);
  res.status(httpStatus.CREATED).send(orderStatus);
});

export const getOrderStatuses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderStatusService.queryOrderStatuses(filter, options);
  res.status(httpStatus.OK).send(result);
});

export const getOrderStatus = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.getOrderStatusById(req.params.orderStatusId);
  if (!orderStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sipariş durumu bulunamadı');
  }
  res.status(httpStatus.OK).send(orderStatus);
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.updateOrderStatusById(
    req.params.orderStatusId,
    req.body.title,
    req.body.color,
    req.body.active,
  );
  res.status(httpStatus.OK).send(orderStatus);
});

export const deleteOrderStatus = catchAsync(async (req, res) => {
  await orderStatusService.deleteOrderStatusById(req.params.orderStatusId);
  res.status(httpStatus.NO_CONTENT).send();
});
