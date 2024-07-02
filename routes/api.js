import express from 'express';
import userRouter from './users.js';
import productCategoryRouter from './productCategories.js';
import productStoreRouter from './productStores.js';
import providerRouter from './providers.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/product-categories', productCategoryRouter);
router.use('/product-stores', productStoreRouter)
router.use('/providers', providerRouter)

export default router;
