import express from 'express';

import { validate } from '../../middlewares/validate';
import { User as userValidation } from '../../validations';
import { User as userController } from '../../controllers';

const router = express.Router();

router.route('/').post(validate(userValidation.createUser), userController.createUser);

export default router;
