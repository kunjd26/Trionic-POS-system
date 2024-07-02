import express from 'express';

import provider from '../controllers/Provider.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import validateProductCategoryCreateRequest from '../requests/ProviderCreate.js';
import validateProductCategoryUpdateRequest from '../requests/ProviderUpdate.js';

const router = express.Router();

router.route('/')
    .post([validateProductCategoryCreateRequest, checkToken, checkPermission('provider:c')], provider.store)
    .get([checkToken, checkPermission('provider:r')], provider.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('provider:r'), checkObjectId], provider.show)
    .put([validateProductCategoryUpdateRequest, checkToken, checkPermission('provider:u'), checkObjectId], provider.update)
    .delete([checkToken, checkPermission('provider:d'), checkObjectId], provider.destroy);

export default router;
