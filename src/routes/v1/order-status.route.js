import express from 'express';

import { validate } from '../../middlewares/validate';
import { OrderStatus as orderStatusValidation } from '../../validations';
import { OrderStatus as orderStatusController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(validate(orderStatusValidation.createOrderStatus), orderStatusController.createOrderStatus)
  .get(validate(orderStatusValidation.getOrderStatuses), orderStatusController.getOrderStatuses);

router
  .route('/:orderStatusId')
  .get(validate(orderStatusValidation.getOrderStatus), orderStatusController.getOrderStatus)
  .patch(validate(orderStatusValidation.updateOrderStatus), orderStatusController.updateOrderStatus)
  .delete(validate(orderStatusValidation.deleteOrderStatus), orderStatusController.deleteOrderStatus);

export default router;
