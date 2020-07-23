import httpStatus from 'http-status';

import { catchAsync } from '../utils/catch-async';
import { pick } from '../utils/pick';
import { Category as categoryService } from '../services';

export const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body.title, req.body.active);
  res.status(httpStatus.CREATED).send(category);
});

export const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  res.status(httpStatus.OK).send(result);
});

export const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kategori bulunamadı');
  }
  res.status(httpStatus.OK).send(category);
});

export const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body.title, req.body.active);
  res.status(httpStatus.OK).send(category);
});

export const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});
