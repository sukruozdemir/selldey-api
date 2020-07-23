import express from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);

export default router;
