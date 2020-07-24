import express from 'express';

import { validate } from '../../middlewares/validate';
import { City as cityValidation } from '../../validations';
import { City as cityController } from '../../controllers';

import provinceRouter from './province.route';

const router = express.Router();

router
  .route('/')
  .post(validate(cityValidation.createCity), cityController.createCity)
  .get(validate(cityValidation.getCities), cityController.getCities);

router
  .route('/:cityId')
  .get(validate(cityValidation.getCity), cityController.getCity)
  .patch(validate(cityValidation.updateCity), cityController.updateCity)
  .delete(validate(cityValidation.deleteCity), cityController.deleteCity);

router.use('/:city/provinces', provinceRouter);

export default router;
