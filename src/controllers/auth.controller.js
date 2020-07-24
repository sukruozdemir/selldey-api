import httpStatus from 'http-status';

import { Auth as authService, Token as tokenService } from './../services';
import { catchAsync } from './../utils/catch-async';

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});
