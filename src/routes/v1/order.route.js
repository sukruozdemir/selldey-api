import express from 'express';

import { validate } from '../../middlewares/validate';
import { Order as orderValidation } from '../../validations';
import { Order as orderController } from '../../controllers';

const router = express.Router();

router.route('/').post(validate(orderValidation.createOrder), orderController.createOrder);

export default router;
