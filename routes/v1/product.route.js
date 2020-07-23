import express from 'express';

import { validate } from '../../middlewares/validate';
import { Product as productValidation } from '../../validations';
import { Product as productController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(validate(productValidation.createProduct), productController.createProduct)
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(validate(productValidation.updateProduct), productController.updateProduct)
  .delete(validate(productValidation.deleteProduct), productController.deleteProduct);

router.route('/:productId/addPrice').post(validate(productValidation.addPrice), productController.addPrice);
router.route('/:productId/removePrice').post(validate(productValidation.removePrice), productController.removePrice);

export default router;
