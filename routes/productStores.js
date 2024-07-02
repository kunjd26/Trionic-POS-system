import express from 'express';

import productStore from '../controllers/productStore.js';
import validateProductStoreCreateRequest from '../requests/ProductStoreCreate.js';
import validateProductStoreUpdateRequest from '../requests/ProductStoreUpdate.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';

const router = express.Router();

router.route('/')
    .post([validateProductStoreCreateRequest, checkToken, checkPermission('product-store:c')], productStore.store)
    .get([checkToken, checkPermission('product-store:r')], productStore.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('product-store:r'), checkObjectId], productStore.show)
    .put([validateProductStoreUpdateRequest, checkToken, checkPermission('product-store:u'), checkObjectId], productStore.update)
    .delete([checkToken, checkPermission('product-store:d'), checkObjectId], productStore.destroy);

export default router;
