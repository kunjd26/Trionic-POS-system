import express from 'express';

import inventory from '../controllers/Inventory.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import validateInventoryCreateRequest from '../requests/inventoryCreate.js';
import validateInventoryUpdateRequest from '../requests/InventoryUpdate.js';
import checkProductId from '../middlewares/CheckProductId.js';
import checkProviderId from '../middlewares/CheckProviderId.js';
import checkProductStoreId from '../middlewares/CheckProductStore.js';
import checkQuantityLimit from '../middlewares/CheckQuantityLimit.js';

const router = express.Router();

router.route('/')
    .post([validateInventoryCreateRequest, checkToken, checkPermission('inventory:c'), checkProductId, checkProviderId, checkProductStoreId, checkQuantityLimit], inventory.store)
    .get([checkToken, checkPermission('inventory:r')], inventory.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('inventory:r'), checkObjectId], inventory.show)
    .put([validateInventoryUpdateRequest, checkToken, checkPermission('inventory:u'), checkObjectId, checkProductId, checkProviderId, checkProductStoreId, checkQuantityLimit], inventory.update)
    .delete([checkToken, checkPermission('inventory:d'), checkObjectId], inventory.destroy);

export default router;
