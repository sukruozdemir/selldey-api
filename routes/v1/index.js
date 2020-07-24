import express from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';
import cityRoute from './city.route';
import productRoute from './product.route';
import provinceRoute from './province.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/cities', cityRoute);
router.use('/products', productRoute);
router.use('/provinces', provinceRoute);

export default router;
