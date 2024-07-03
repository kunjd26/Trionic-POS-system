import express from 'express';

import product from '../controllers/Product.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import validateProductCreateRequest from '../requests/ProductCreate.js';
import validateProductUpdateRequest from '../requests/ProductUpdate.js';
import checkProductCategoryId from '../middlewares/CheckProductCategoryId.js';

const router = express.Router();

router.route('/')
    .post([validateProductCreateRequest, checkToken, checkPermission('product:c'), checkProductCategoryId], product.store)
    .get([checkToken, checkPermission('product:r')], product.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('product:r'), checkObjectId], product.show)
    .put([validateProductUpdateRequest, checkToken, checkPermission('product:u'), checkObjectId, checkProductCategoryId], product.update)
    .delete([checkToken, checkPermission('product:d'), checkObjectId], product.destroy);

export default router;
