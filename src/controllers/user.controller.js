import httpStatus from 'http-status';

import { User as userService } from './../services';
import { catchAsync } from './../utils/catch-async';

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});
