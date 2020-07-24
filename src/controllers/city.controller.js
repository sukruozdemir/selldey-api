import httpStatus from 'http-status';

import { catchAsync } from '../utils/catch-async';
import { pick } from '../utils/pick';
import { City as cityService } from '../services';

export const createCity = catchAsync(async (req, res) => {
  const city = await cityService.createCity(req.body.title, req.body.no);
  res.status(httpStatus.CREATED).send(city);
});

export const getCities = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'no']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cityService.queryCities(filter, options);
  res.status(httpStatus.OK).send(result);
});

export const getCity = catchAsync(async (req, res) => {
  const city = await cityService.getCityById(req.params.cityId);
  if (!city) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Şehir bulunamadı');
  }
  res.status(httpStatus.OK).send(city);
});

export const updateCity = catchAsync(async (req, res) => {
  const city = await cityService.updateCityById(req.params.cityId, req.body.title, req.body.no);
  res.status(httpStatus.OK).send(city);
});

export const deleteCity = catchAsync(async (req, res) => {
  await cityService.deleteCityById(req.params.cityId);
  res.status(httpStatus.NO_CONTENT).send();
});
