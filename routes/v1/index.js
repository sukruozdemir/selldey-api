import express from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';
import productRoute from './product.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/products', productRoute);

export default router;
