import express from 'express';

import { validate } from './../../middlewares/validate';
import { Auth as authValidation } from './../../validations';
import { Auth as authController } from './../../controllers';

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);

export default router;
