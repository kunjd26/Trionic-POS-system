import express from 'express';
import userRouter from './users.js';
import productCategoryRouter from './productCategories.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/product-categories', productCategoryRouter);

export default router;
