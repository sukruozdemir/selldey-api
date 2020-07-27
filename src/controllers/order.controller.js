import httpStatus from 'http-status';

import { catchAsync } from '../utils/catch-async';
import { Order as orderService } from '../services';

export const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});
