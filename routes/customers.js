import express from 'express';

import customer from '../controllers/Customer.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import checkCustomerEmailIsTaken from '../middlewares/CheckCustomerEmailIsTaken.js';
import checkCustomerPhoneIsTaken from '../middlewares/CheckCustomerPhoneIsTaken.js';
import validateCustomerCreateRequest from '../requests/CustomerCreate.js';
import validateCustomerUpdateRequest from '../requests/CustomerUpdate.js';

const router = express.Router();

router.route('/')
    .post([validateCustomerCreateRequest, checkToken, checkPermission('customer:c'), checkCustomerEmailIsTaken, checkCustomerPhoneIsTaken], customer.store)
    .get([checkToken, checkPermission('customer:r')], customer.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('customer:r'), checkObjectId], customer.show)
    .put([validateCustomerUpdateRequest, checkToken, checkPermission('customer:u'), checkObjectId, checkCustomerEmailIsTaken, checkCustomerPhoneIsTaken], customer.update)
    .delete([checkToken, checkPermission('customer:d'), checkObjectId], customer.destroy);

export default router;
