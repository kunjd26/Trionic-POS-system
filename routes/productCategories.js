import express from 'express';

import productCategory from '../controllers/ProductCategory.js';
import validateProductCategoryCreateRequest from '../requests/ProductCategoryCreate.js';
import validateProductCategoryUpdateRequest from '../requests/ProductCategoryUpdate.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';

const router = express.Router();

router.route('/')
    .post([validateProductCategoryCreateRequest, checkToken, checkPermission('product-category:c')], productCategory.store)
    .get([checkToken, checkPermission('product-category:r')], productCategory.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('product-category:r'), checkObjectId], productCategory.show)
    .put([validateProductCategoryUpdateRequest, checkToken, checkPermission('product-category:u'), checkObjectId], productCategory.update)
    .delete([checkToken, checkPermission('product-category:d'), checkObjectId], productCategory.destroy);

export default router;
