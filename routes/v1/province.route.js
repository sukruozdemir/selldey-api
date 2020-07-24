import express from 'express';

import { validate } from '../../middlewares/validate';
import { Province as provinceValidation } from '../../validations';
import { Province as provinceController } from '../../controllers';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(validate(provinceValidation.createProvince), provinceController.createProvince)
  .get(validate(provinceValidation.getProvinces), provinceController.getProvinces);

router
  .route('/:provinceId')
  .get(validate(provinceValidation.getProvince), provinceController.getProvince)
  .patch(validate(provinceValidation.updateProvince), provinceController.updateProvince)
  .delete(validate(provinceValidation.deleteProvince), provinceController.deleteProvince);

export default router;
