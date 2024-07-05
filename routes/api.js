import express from 'express';
import userRouter from './users.js';
import productCategoryRouter from './productCategories.js';
import productStoreRouter from './productStores.js';
import providerRouter from './providers.js';
import productRouter from './products.js';
import inventoryRouter from './inventories.js';
import customerRouter from './customers.js';
import orderRouter from './orders.js';
import invoiceRouter from './invoices.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/product-categories', productCategoryRouter);
router.use('/product-stores', productStoreRouter);
router.use('/providers', providerRouter);
router.use('/products', productRouter);
router.use('/inventories', inventoryRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);
router.use('/invoices', invoiceRouter);

export default router;
