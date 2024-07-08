import express from 'express';

import order from '../controllers/Order.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import validateOrderCreateRequest from '../requests/OrderCreate.js';
import validateOrderUpdateRequest from '../requests/OrderUpdate.js';
import checkInventoryIdAndCountSubtotal from '../middlewares/CheckInventoryIdAndCountSubtotal.js';
import checkAvailableQuantity from '../middlewares/CheckAvailableQuantity.js';

const router = express.Router();

router.route('/')
    .post([validateOrderCreateRequest, checkToken, checkPermission('order:c'), checkInventoryIdAndCountSubtotal, checkAvailableQuantity], order.store)
    .get([checkToken, checkPermission('order:r')], order.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('order:r'), checkObjectId], order.show)
    .put([validateOrderUpdateRequest, checkToken, checkPermission('order:u'), checkObjectId, checkInventoryIdAndCountSubtotal], order.update)
    .delete([checkToken, checkPermission('order:d'), checkObjectId], order.destroy);

export default router;
