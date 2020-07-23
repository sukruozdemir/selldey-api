import httpStatus from 'http-status';

import { catchAsync } from '../utils/catch-async';
import { pick } from '../utils/pick';
import { Province as provinceService } from '../services';

export const createProvince = catchAsync(async (req, res) => {
  const province = await provinceService.createProvince(req.body.title, req.body.city);
  res.status(httpStatus.CREATED).send(province);
});

export const getProvinces = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'city']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await provinceService.queryProvices(filter, options);
  res.status(httpStatus.OK).send(result);
});

export const getProvince = catchAsync(async (req, res) => {
  const province = await provinceService.getProvinceById(req.params.provinceId);
  if (!province) {
    throw new ApiError(httpStatus.NOT_FOUND, 'İlçe bulunamadı');
  }
  res.status(httpStatus.OK).send(province);
});

export const updateProvince = catchAsync(async (req, res) => {
  const province = await provinceService.updateProvinceById(req.params.provinceId, req.body.title, req.body.city);
  res.status(httpStatus.OK).send(province);
});

export const deleteProvince = catchAsync(async (req, res) => {
  await provinceService.deleteProvinceById(req.params.provinceId);
  res.status(httpStatus.NO_CONTENT).send();
});
