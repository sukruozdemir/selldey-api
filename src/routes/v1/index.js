import express from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';
import cityRoute from './city.route';
import orderRoute from './order.route';
import orderStatusRoute from './order-status.route';
import productRoute from './product.route';
import provinceRoute from './province.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/cities', cityRoute);
router.use('/orders', orderRoute);
router.use('/orderstatuses', orderStatusRoute);
router.use('/products', productRoute);
router.use('/provinces', provinceRoute);
router.use('/users', userRoute);

export default router;
