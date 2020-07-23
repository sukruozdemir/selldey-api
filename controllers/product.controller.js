import httpStatus from 'http-status';

import { catchAsync } from '../utils/catch-async';
import { pick } from '../utils/pick';
import { Product as productService } from '../services';

export const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

export const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'site', 'active', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.status(httpStatus.OK).send(result);
});

export const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ürün bulunamadı');
  }
  res.status(httpStatus.OK).send(product);
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.status(httpStatus.OK).send(product);
});

export const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const addPrice = catchAsync(async (req, res) => {
  const product = await productService.addProductPriceById(req.params.productId, req.body.price, req.body.quantity);
  res.status(httpStatus.OK).send(product);
});

export const removePrice = catchAsync(async (req, res) => {
  const product = await productService.removeProductPriceById(req.params.productId, req.body.priceId);
  res.status(httpStatus.OK).send(product);
});
